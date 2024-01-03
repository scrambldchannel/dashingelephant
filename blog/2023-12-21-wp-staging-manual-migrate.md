---
title: WP Staging - manually pushing staging site to live
date: 2023-12-21
summary: It's been a long time since I've worked, or even played with Wordpress but is something I used to be quite familiar with. So when a friend asked for help with deploying a site she'd been working on live, I confidently offered my assistance without considering how rusty I was.

tags:
  - wordpress
  - php
  - hack
  - mysql
  - wp-staging
---

It's been a long time since I've worked, or even played with Wordpress but is something I used to be quite familiar with. So when a friend asked for help with deploying a site she'd been working on live, I confidently offered my assistance without considering how rusty I was.

She was using a plugin called [WP Staging](https://wp-staging.com/) which made it easy to create a copy of the live site in a subfolder of the live site. The paid version promises a one click solution to then push changes made in the staging environment back to live.

She's on a budget and is only working with one client with this particular setup so was looking for a way to handle this manually. The good news was that even though this was one of the main selling points of their pro offering, the plugin creators [provide instructions on doing this manually](https://wp-staging.com/migrate-wordpress-staging-site-to-production-site).

That said, the instructions are a little hard to follow but one can totally understand why this isn't their top priority! Still, I was able to muddle through it and come up with a solution, that although a little janky, got the job done.

There are two main steps:

1. Copy uploads, plugins, and themes from staging to live
2. Migrate the database (or point the live site to the tables used by the staging site)

### Copy the files

This step is pretty simple and in most cases, should be pretty relatively risk free. You'll need a way to manage the file system which depends on your setup. You might be using a host that allows shell access, or be limited to sftp etc. Alternatively, you can use a plugin such as [File Manager](https://de.wordpress.org/plugins/wp-file-manager/). 

The WP Migrate plugin sets up the staging site in a subfolder within the live site's folder structure. To migrate any plugins, uploads, and themes added or modified in the staging site, you should copy the relevant files from the staging folder to the live folders.

Their [instructions](https://wp-staging.com/migrate-wordpress-staging-site-to-production-site/#2_Step_Copy_Files) suggest you need to copy the contents of `<staging_site>/wp-content/plugins`, `<staging_site>/wp-content/themes`, and `<staging_site>/wp-content/uploads`. I would check to make sure there wasn't anything relevant added to other folders within `wp-content` too.

You should probably think about whether you want to simply add any new files, or completely replace the contents of the folder (this might be the way to go if you've removed things in staging and want to remove them from the live site too)

Once you've done this, if you open up the dashboard for your live site, you should be able see any new plugins, themes, and uploads. It's not a bad idea to check at this point to make sure this step has worked. Note that new plugins and themes won't be activated, that config is stored in the database and will be covered in the next step.

### Migrate the database

The staging site uses the same database but creates duplicates of all the wordpress tables with a different prefix (e.g. `wpstg0_`). Changes made in the staging environment will be contained in the staging versions of the tables. Depending on the changes, there may even be new tables in the staging environment. 

What we want to achieve is to get the live wordpress site to refer to tables with the equivalent 


Remove that line from the options table using e.g. SQL Buddy

Change prefix in the wp-config.php 

Maybe you can use some sort of plugin to write SQL to update the tables. 

It's a bit janky that we're now using different tables but will anyone ever notice in this case? 

### Clean up

Remove the old staging site by deleting the folder

Create a new staging environment at a later date (should increment numeric part of table prefix)

Rinse repeat

### Troubleshooting

Delete the plugins folder if all else fails.


### Last thoughts

There must be a better way end to end using only free / open source tooling. 

Having a staging env on the prod server in a subfolder is janky


##### Notes

* It's something to do with Google fonts
* It should use the assistant font on all pages but doesn't
* How does divi handle google fonts? 
* * https://webdevtrust.com/divi-gdpr-compliance-google-fonts/ - where fonts can be saved within theme directly
* * https://wordpress.org/support/topic/omgf-and-divi-theme/ - maybe disable this option? 
* Maybe fonts can just be downloaded and added to wp-content/themes/your-theme/fonts?
* * Or maybe there was a file in the divi child theme that needed to be copied across
* Generally, try clearing all other cache/optimisation things that have been installed or even disable caching altogether
* * Observer what files are cleared from the wp directory when this happens
* Check hosting panel again - raise ticket as last resort


Turning that option on within Divi fixed it but we're not complying with GDPR

self hosted google fonts wordpress

+ Seems dated 