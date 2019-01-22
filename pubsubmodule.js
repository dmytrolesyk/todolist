//If you've not used pub/sub before, the gist is that you publish to a topic and anyone can subscribe, much like the way a radio works: 
//a radio station broadcasts (publishes) and anyone can listen (subscribes).  
//This is excellent for highly modular web applications; it's a license to globally communicate without attaching to any specific object.



var events = (function(){
    var topics = {};
    var hOP = topics.hasOwnProperty;
  
    return {
      subscribe: function(topic, listener) {
        // Create the topic's object if not yet created
        if(!hOP.call(topics, topic)) topics[topic] = [];
  
        // Add the listener to queue
        var index = topics[topic].push(listener) -1;
  
        // Provide handle back for removal of topic
        return {
          remove: function() {
            delete topics[topic][index];
          }
        };
      },
      publish: function(topic, info) {
        // If the topic doesn't exist, or there's no listeners in queue, just leave
        if(!hOP.call(topics, topic)) return;
  
        // Cycle through topics queue, fire!
        topics[topic].forEach(function(item) {
                item(info != undefined ? info : {});
        });
      }
    };
  })();


  //Publishing to a topic:

events.publish('/page/load', {
	url: '/some/url/path' // any argument
});

//...and subscribing to said topic in order to be notified of events:

var subscription = events.subscribe('/page/load', function(obj) {
	// Do something now that the event has occurred
});

// ...sometime later where I no longer want subscription...
subscription.remove();


//I use pub/sub religiously on this website and this object has done me a world of good.  
//I have one topic that fires upon each AJAX page load, and several subscriptions fire during that event (ad re-rendering, 
//comment re-rendering, social button population, etc.).  
//Evaluate your application and see where you might be able to use pub/sub!

// https://www.youtube.com/watch?v=nQRXi1SVOow&t=1s
// https://www.youtube.com/watch?v=jDhDvnlbr4Q
// https://hackernoon.com/observer-vs-pub-sub-pattern-50d3b27f838c
// https://itnext.io/why-every-beginner-front-end-developer-should-know-publish-subscribe-pattern-72a12cd68d44

