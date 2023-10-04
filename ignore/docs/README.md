# Installation

FlatDesk is fully written in HTML/JS/CSS so you don't have to install any CMS etc. These are the steps you have to take:

## 1. Open FlatDesk Configurator

You have 2 options here:

- you can visit our Online configurator (there will be always the latest version, so remember to keep your project up to date)
- or locally, you can put FlatDesk project in your Web server's (such as XAMPP for Windows or MAMP for Mac) htdocs folder, then just open it in your browser, probably available at "localhost/index-config.html"

## 2. Configure your template

Now the magic begins. On the right side of page you can see the Configurator menu, separated by objects. Yes, you can configure almost everything here. Colors of objects, position, rotation, light properties, shadows, camera and more.

You can make this template look unique, way different from the original one, so give free rein to your imagination! Modifying most of these inputs is optional, although there are some mandatory fields, such as your Social links, your contact e-mail, and your projects of course. So make sure, you've reviewed all the fields.

When you're ready you can click Save config to export FlatDesk Config File (config.json). Put it in your project folder, near index.html.

## 3. Configure the assets

As you might've seen, in some options in Configurator you had to put a path to the image (for example when you chose Slides option in Phone). So make sure to place them in the images folder. Replace the logo, business card, personal resume, and everything you want! Some textures will have empty space, please don't remove it - this will be hidden, but it's needed for optimization reasons. The best way to edit assets is to use provided PSD files and modify Smart Object's content. Or just make sure to replace only "colorful" parts of images ;)

Now, when you finished with the images, replace favicon.ico and <title> in index.html.

You should also make sure that you have PHP installed on your server (usually it is installed by default on most of www servers). This is needed for sending e-mail by Postcard form.

That's it! Now you can remove index-config.html, copy our project folder's content and publish it on your WWW server!

## Configuring content types in objects

### Slides

This can be used in Phone, Tablet and Desktop. Just add paths to images, relative to images folder. For example, if your image path is images/projects/phone/screen1.png, then place projects/phone/screen1.png.

Note: Duplicate paths are not allowed!

### URL

This can be used in Phone, Tablet and Desktop. Simple. Just place url here, for example http://johndoe.com

Note: This is gonna be embeded by iframe, so if destination website isn't loading check its 'X-Frame-Options'.

### HTML

This can be used in Phone, Tablet and Desktop. Just add paths to html projects, relative to project folder. For example, websites/index.html.

### Invision

This can be used in Phone or Tablet. Here you can embed a prototype created in InVision. When you login there, click "+" in the top right side, then "Create new prototype", choose "iPhone/iPad". When the prototype is ready, choose "Embed prototype" from top menu, and copy provided link. Now put it in the configurator, and thats it.

Note: Remember to create new iPhone or iPad prototype, so it will have proper size and aspect ratio.

### Left/Right Image

This is just left and right sheet of paper in Paper Folders on the desk. The size of image should be 2480x3508 so it'll fill whole sheet.

Note: The easiest way to modify this is to edit Portfolio files in images folder.
