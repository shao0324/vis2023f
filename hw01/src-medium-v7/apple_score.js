d3.select("#div1")
            .append("table")
            .append("tr")
            .selectAll("td")
            .data([10,9,8,7,6,5,4,3,2,1,0])
            .enter()
            .append("td")
            .text(function (d, i) {
                if (i <= 10 || isNaN(d)) {
                    return d;
                }
            })
            // img
            .attr("class", function (d, i) { 
                if (d == 10) return "excellent-kid"; 
                else if (d >= 7 ) return "good-kid"; 
                else if (d >= 2 ) return "fair-kid"; 
                else return "poor-kid";})
            .append("img")
            .attr("src", function (d, i) { 
                if (d == 10) return "./index_files/52.svg";
                else if (d == 9) return "./index_files/51.svg";
                else if (d == 8) return "./index_files/42.svg";
                else if (d == 7) return "./index_files/41.svg";
                else if (d == 6) return "./index_files/32.svg";
                else if (d == 5) return "./index_files/31.svg";
                else if (d == 4) return "./index_files/22.svg";
                else if (d == 3) return "./index_files/21.svg";
                else if (d == 2) return "./index_files/12.svg";
                else if (d == 1) return "./index_files/11.svg";
                else if (d == 0) return "./index_files/01.svg";
                else return "./index_files/00.svg"; })
            .attr("x", "0")
            .attr("y", "0")
            .attr("width",  function(d, i) { return (i + 1) * 60; })
            .attr("height", function(d, i) { return (i + 1) * 60; });

            var tableContainer = d3.select("#div2");
            
            // referecne: https://github.com/HiJuke/vis2023f/blob/main/hw01/src-medium/index.html
            d3.text("./csv/data.csv").then(function(data) {

                var parsedCSV = d3.csvParseRows(data);

                // 將二維陣列轉換為物件陣列
                var headers = parsedCSV[0];
                var data = parsedCSV.slice(1).map(function(row) {
                    var obj = {};
                    row.forEach(function(value, i) {
                        obj[headers[i]] = value;
                    });
                    return obj;
                });

                // 創建表格元素
                var table = tableContainer.append("table");
                var thead = table.append("thead");
                var tbody = table.append("tbody");

                // 添加表頭
                thead.append("tr")
                    .selectAll("th")
                    .data(headers)
                    .enter()
                    .append("th")
                    .text(function(d) { return d; });

                // 添加表格行
                var rows = tbody.selectAll("tr")
                    .data(data)
                    .enter()
                    .append("tr");

                // 添加表格單元格
                var cells = rows.selectAll("td")
                    .data(function(row) {
                        return headers.map(function(header) {
                            return { header: header, value: row[header] };
                        });
                    })
                    .enter()
                    .append("td")
                    .html(function(d, i) {
                        if ( i == 4 && d.value != 'GitHub 帳號' ) {
                            return '<a href="https://' + d.value + '.github.io/vis2023f/" target="_blank"><img src="https://' + d.value + '.github.io/vis2023f/hw00/me.jpg"></a>' + '<hr><a href="https://github.com/' + d.value + '/vis2023f/" target="_blank">' + d.value + '</a>';
                        }
                        else if ( i == 0 || i == 2 || isNaN(d.value)) {
                            return d.value;
                        }
                    })
                    .filter(function (d, i) { return (i >= 2 && !isNaN(d.value) && d.value != ""); })
                    .attr("class", function (d, i) { 
                        if (d.value == 10) return "excellent-kid"; 
                        else if (d.value >= 7 ) return "good-kid"; 
                        else if (d.value >= 2 ) return "fair-kid"; 
                        else return "poor-kid";})
                    .append("img")
                    .attr("src", function (d, i) {
                        if (d.value == 10) 
                            return "./index_files/52.svg";
                        else if (d.value == 9) 
                            return "./index_files/51.svg";
                        else if (d.value == 8) 
                            return "./index_files/42.svg";
                        else if (d.value == 7) 
                            return "./index_files/41.svg";
                        else if (d.value == 6) 
                            return "./index_files/32.svg";
                        else if (d.value == 5) 
                            return "./index_files/31.svg";
                        else if (d.value == 4) 
                            return "./index_files/22.svg";
                        else if (d.value == 3) 
                            return "./index_files/21.svg";
                        else if (d.value == 2) 
                            return "./index_files/12.svg";
                        else if (d.value == 1) 
                            return "./index_files/11.svg";
                        else if (d.value == 0) 
                            return "./index_files/01.svg";
                        else 
                            return "./index_files/00.svg";
                    })
                    .attr("width", 50)
                    .attr("height", 50);
            }).catch(function(error) {
                console.log(error);
            });