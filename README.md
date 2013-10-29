SVU Online Lectures Scraper
==========================

A small utility to automate recorded sessions download process for Syrian Virtual University students.

You need to install iMacros browser plugin and then load the imacros script.
First configure the imacros script and create folders for courses and a folder inside each course called Sessions  

After the configuration run the iMacros script to scrap sessions data.
Now you will need to run the downloaded (which is a nodejs script)

Be sure to install csv module first

    npm install csv

Now just place the downloader in the folder which contain your courses folders and run it.

    node downloader.js

Enjoy!
