
// time to wait for each ajax call, adjust depending on your network.
var waitTime = 1;

// path to download sessions to
var filePath = '/Users/louy/Documents/SVU/';

// list of courses to grab lectures for
var courses = [
  {
    name: "EDAD",
    dir : "DAD [Data Analysis & Database Design]",
    // Optional:
    //class: 'C1',
  },
  {
    name: "EGMP",
    dir : "GMP [Global Marketplace]",
  },
  {
    name: "ESCM",
    dir : "SCM [Supply Chain Management]",
  },
  {
    name: "EECP2",
    dir : "ECP2 [E-Commerce Project 2]",
  },
];

// semester to download
var semester = 'S13';


macro = "CODE:";
macro += "SET !ERRORIGNORE YES\n"
macro += "SET !EXTRACT_TEST_POPUP NO\n"
macro += "SET !TIMEOUT_STEP 0\n"

for( i in courses ) {
  macro += "FILEDELETE NAME=\"" + filePath + courses[i].dir + "/Sessions/sessions.csv\"\n"
}

macro += "TAB T=1\n"
macro += "URL GOTO=http://sessions.svuonline.org/new/Default.aspx\n\n"


macro += "TAG POS=1 TYPE=SELECT FORM=ID:form1 ATTR=ID:DropDownList_Term CONTENT=%" + semester + "\n"
macro += "WAIT SECONDS="+waitTime+"\n"

macro += "TAG POS=1 TYPE=SELECT FORM=ID:form1 ATTR=ID:DropDownList_Program CONTENT=%EHND\n"
macro += "WAIT SECONDS="+waitTime+"\n"


for( i in courses ) {
	macro += "TAG POS=1 TYPE=SELECT FORM=ID:form1 ATTR=ID:DropDownList_Course CONTENT=%" + courses[i].name + "\n" + 
		 "WAIT SECONDS="+waitTime+"\n";
		 
	if( courses[i].class )
	macro += "TAG POS=1 TYPE=SELECT FORM=ID:form1 ATTR=ID:DropDownList_Class CONTENT=%" + courses[i].class + "\n" + 
		 "WAIT SECONDS="+waitTime+"\n";
	
	for( var j = 1; j <= 6; ++j ) {
		macro +="TAG POS="+j+" TYPE=A ATTR=TXT:Select\n" + 
			"WAIT SECONDS="+waitTime+"\n" + 
			"TAG POS=1 TYPE=A ATTR=TXT:Download EXTRACT=href\n" +
			"TAG POS=2 TYPE=A ATTR=TXT:Download EXTRACT=href\n" +
			"TAG POS=3 TYPE=A ATTR=TXT:Download EXTRACT=href\n" +
			"TAG POS=4 TYPE=A ATTR=TXT:Download EXTRACT=href\n"
	}
	
	macro += 'SAVEAS TYPE=EXTRACT FOLDER="' + filePath + courses[i].dir + '/Sessions" FILE=sessions.csv\n';
	macro += 'SET !EXTRACT NULL\n';
}

iimPlay(macro)


