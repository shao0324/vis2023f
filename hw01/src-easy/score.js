
// https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function getRandomDepartment() {
    const departments = ["資工", "資工碩", "電資AI", "電資資安", "創新AI"];

    const randomIndex = Math.floor(Math.random() * departments.length);
    return departments[randomIndex];
}

function generateRandomStudentID() {
    // 隨機選擇1~3碼
    const prefix1to3 = ["111", "112"];
    const randomPrefix1to3 = prefix1to3[Math.floor(Math.random() * prefix1to3.length)];

    // 隨機選擇4~6碼
    const prefix4to6 = ["590", "598", "C52", "C53", "C71"];
    const randomPrefix4to6 = prefix4to6[Math.floor(Math.random() * prefix4to6.length)];

    // 隨機選擇7~9碼
    const randomSuffix = ("000" + Math.floor(Math.random() * 1000)).slice(-3);

    // 組合成學號
    const studentID = randomPrefix1to3 + randomPrefix4to6 + randomSuffix;

    return studentID;
}

a1 = createArray();
a2 = createArray(2);
a3 = createArray(121, 13);

a3[0] = ['序號', '班級', '學號', '姓名', 'GitHub 帳號', '作業一', '作業二', '作業三', '作業四', '作業五', '作業六', '作業七', '作業八', '作業九', '作業十']

for (var i = 1; i < a3.length; i++) {
    a3[i][0] = i;
    a3[i][1] = getRandomDepartment();
    a3[i][2] = generateRandomStudentID();
    a3[i][3] = String.fromCharCode(Math.floor(Math.random() * 0x51ff + 0x4e00)) +
               String.fromCharCode(Math.floor(Math.random() * 0x51ff + 0x4e00)) +
               String.fromCharCode(Math.floor(Math.random() * 0x51ff + 0x4e00));
    
    //a3[i][2] = 'github';
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    // Math.random() 會回傳一個偽隨機小數 (pseudo-random) 介於 0 到 1 之間(包含 0，不包含 1) 
    // str.substring(indexStart[, indexEnd])
    // number.toString(radix) 10個數字 + 26個英文字母 = 36
    a3[i][4] = (Math.random() + 1).toString(36).substring(2);

    for (var j = 5; j < a3[0].length; j++) {
        a3[i][j] = Math.floor(Math.random() * 10);
    }
}
//alert(a3);

// https://medium.com/wdstack/quick-blurb-generating-a-table-from-an-array-in-javascript-41386fd449a9
//setup our table array
var tableArr = [
    ["row 1, cell 1", "row 1, cell 2"],
    ["row 2, cell 1", "row 2, cell 2"]
]
//create a Table Object
let table = document.createElement('table');
//iterate over every array(row) within tableArr
for (let row of a3) {
    //Insert a new row element into the table element
    table.insertRow();
    //Iterate over every index(cell) in each array(row)
    for (let cell of row) {
        //While iterating over the index(cell)
        //insert a cell into the table element
        let newCell = table.rows[table.rows.length - 1].insertCell();
        //add text to the created cell element
        newCell.textContent = cell;
    }
}
//append the compiled table to the DOM
document.body.appendChild(table);

function tableToCSV() {
    // Variable to store the final csv data
    var csv_data = [];
 
    // Get each row data
    var rows = document.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
 
        // Get each column data
        var cols = rows[i].querySelectorAll('td,th');
 
        // Stores each csv row data
        var csvrow = [];
        for (var j = 0; j < cols.length; j++) {
 
            // Get the text data of each cell
            // of a row and push it to csvrow
            csvrow.push(cols[j].innerHTML);
        }
 
        // Combine each column value with comma
        csv_data.push(csvrow.join(","));
    }
 
    // Combine each row data with new line character
    csv_data = csv_data.join('\n');
 
    // Call this function to download csv file 
    downloadCSVFile(csv_data);
}
 
function downloadCSVFile(csv_data) {
    // Create CSV file object and feed
    // our csv_data into it
    CSVFile = new Blob([csv_data], {
        type: "text/csv"
    });
 
    // Create to temporary link to initiate
    // download process
    var temp_link = document.createElement('a');
 
    // Download csv file
    temp_link.download = "data.csv";
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
 
    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
 
    // Automatically click the link to
    // trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
}