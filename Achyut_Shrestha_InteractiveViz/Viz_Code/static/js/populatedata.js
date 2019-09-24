var url = "https://shresthaachyut.github.io/Achyut_Shrestha_BioDiversity/samples.json"
var testSubjectID = [];

addOption = function(selectbox, text, value) {
    var optn = document.createElement("OPTION");
    optn.text = text;
    optn.value = value;
    selectbox.options.add(optn);  
}

d3.json(url).then((importedData)=>{
    var fullData = importedData;
    importedData.names.map(data=>testSubjectID.push(data))

    var dropdown = d3.select("#selDataset").node();
    if (dropdown) {
        for (var i=0; i < testSubjectID.length;++i){    
            addOption(dropdown, testSubjectID[i], testSubjectID[i]);
        }
    }
});
