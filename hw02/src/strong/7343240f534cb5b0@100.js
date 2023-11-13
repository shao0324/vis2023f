function _1(md){return(
md`# HW2 Strong baseline (2pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _ConstellationName(){return(
["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "魔羯座", "水瓶座", "雙魚座"]
)}

function _yCounts(){return(
[]
)}

function _5(yCounts,ConstellationName,data)
{
  yCounts.length = 0;
  
  for (let i = 0; i < ConstellationName.length; i++) {
    yCounts.push({constellation: ConstellationName[i], gender: "male", count: 0});
    yCounts.push({constellation: ConstellationName[i], gender: "female", count: 0});
  }
  
  data.forEach (x => {
    let j = (x.Constellation) * 2 + (x.Gender == "男" ? 0 : 1);  // 每兩個 Array element 為一組: 男 & 女，取"女"則 +1
    yCounts[j].count++;
  })
  
  return yCounts
}


function _plot1(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _7(Plot,plot1,yCounts){return(
Plot.plot({
  marginTop: plot1.mt,
  marginRight: plot1.mr,
  marginBottom: plot1.mb,
  marginLeft: plot1.ml,
  
  grid: true,
  y: {label: "count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(yCounts, {x: "constellation", y: "count", tip: true , fill: "gender"}),
  ]
})
)}

function _newData(){return(
[]
)}

function _9(newData,data,ConstellationName)
{
  newData.length = 0;
  
  data.forEach (x => {
    newData.push({constellation: ConstellationName[x.Constellation], gender: (x.Gender == "男" ? "male" : "female")});
  })
  
  return newData
}


function _plot2(Inputs){return(
Inputs.form({
	mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
	mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
	mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
	ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _11(Plot,plot2,newData){return(
Plot.plot({  
  
	marginTop: plot2.mt, 
	marginRight: plot2.mr, 
	marginBottom: plot2.mb, 
	marginLeft: plot2.ml,
	y: {grid: true, label: "count"},  
	marks: [    
		Plot.rectY(newData, Plot.binX({y: "count"}, {x: "constellation", fill: "gender", tip: true})),    
		Plot.gridY({interval: 1, stroke: "white", strokeOpacity: 0})
	 ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("ConstellationName")).define("ConstellationName", _ConstellationName);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer()).define(["yCounts","ConstellationName","data"], _5);
  main.variable(observer("viewof plot1")).define("viewof plot1", ["Inputs"], _plot1);
  main.variable(observer("plot1")).define("plot1", ["Generators", "viewof plot1"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot1","yCounts"], _7);
  main.variable(observer("newData")).define("newData", _newData);
  main.variable(observer()).define(["newData","data","ConstellationName"], _9);
  main.variable(observer("viewof plot2")).define("viewof plot2", ["Inputs"], _plot2);
  main.variable(observer("plot2")).define("plot2", ["Generators", "viewof plot2"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot2","newData"], _11);
  return main;
}
