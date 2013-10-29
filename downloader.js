var exec = require('child_process').exec,
    fs = require('fs'),
    csv = require('csv');

var materials = [
	'SCM [Supply Chain Management]',
	'GMP [Global Marketplace]',
	'ECP2 [E-Commerce Project 2]',
	'DAD [Data Analysis & Database Design]',
]

var stack = [], processing = false;

materials.forEach(function(material) {
	if(! fs.existsSync(material+'/Sessions/sessions.csv') ) return;

	csv().from.path(material+'/Sessions/sessions.csv', { delimiter: ',', escape: '"' })
	.to.array( function(data){
		var d = data[0].filter(function($) {
				return $ != '#EANF#';
			});
		d = d.reverse().filter(function (e, i, arr) {
			    return arr.indexOf(e, i+1) === -1;
			}).reverse();
		for( var j in d ) {
			stack.push( [d[j], material.replace(/(["\s'$`\\&])/g,'\\$1') + '/Sessions'] );
			doProcess();
		}
	} );

});

function doProcess() {
	if( processing || !stack.length ) return;
	processing = true;
	var job = stack.pop();
	job.push(function() {
		processing = false;
		doProcess();
	});
	wget.apply(null, job);
}

function wget(url, path, done) {
	console.log('wget -q -c ' + url + ' -P ' + path);
	done = done || function(){}
	exec('wget -q -c ' + url + ' -P ' + path, function (error, stdout, stderr) {
		done();
		if (error !== null) {
			console.log('wget error: ' + error);
		}
	});
}
