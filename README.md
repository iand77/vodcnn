# CNN VOD App

_If your not viewing this via github you can copy and paste the contents of this file into https://stackedit.io/app to render the markdown._

**Client**
Accedo

**Developer**
Ian de Almeida

## Usage Instructions

**1. Install NodeJS on your machine.**

You can verify if it is already installed on your machine by running the command:

```npm -h```

**2. Start a CORS server on your local machine in order for the AJAX calls to work.**

  

Run the following command:

```npm install -g cors-server```

To run the cors server enter the following command:

````cors-server 8080````

  

More informaton about this package can be found at: https://www.npmjs.com/package/cors-server

  

**3. Launch dist/index.html in Chrome**

To improve the layout enter responsive mode
<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>, then <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> and set the viewport dimensions to _height_: 1280 and _width_: 720.

  
  

## Test Answers

  

**1. Describe the data you would capture as part of this service.**

- Movie URL

- Movie Meta information (category, duration, tags, synopsis)

- Date saved (for ordering purposes)

**2. How would make this service more efficient?**

Can cache data inside the browser using localStorage and only make an API request if the data is not present

**3. Once the feature is complete, how would you know that it’s ready for go-live?**

If it has been tested rigorously on a large dataset and over many VOD devices/platforms, giving priority to devices that are in high usage.

**4. How would you determine if this feature is successful?**

Can use an analytics tool to measure the feature usage.

This feature could be considered successful if saved videos are actually viewed in the end. This conversion rate could be measured.

A multivariate testing strategy could be used to optimize the layout. The save video button positioning/styling could be tested across multiple split tests to find the optimal location/style. The recording playback page could also be optimized with a similar approach.