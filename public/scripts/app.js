/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function createTweetElement(tweet) {
  var date = new Date(tweet.created_at)
  var tweetEl = `<article class='single tweet'>
  <header>
    <img src='${tweet.user.avatars.regular}' class='avatar'><h2 class='username'>${tweet.user.name}</h2><span class='handle'>${tweet.user.handle}</span>
  </header>
  <div class='content'>${tweet.content.text}</div>
  <footer>${date}
    <span>
      <a href='#'><img src='/images/flag.png'></a>
      <a href='#'><img src='/images/retweet.png'></a>
      <a href='#'><img src='/images/heart.png'></a>
    </span>
  </footer>
</article>`
return tweetEl
}

function renderTweets(tweets) {
  tweets.sort((a,b) => {
    return b.created_at - a.created_at
  })
  for (tweet in tweets) {
    var $tweet = createTweetElement(tweets[tweet])
    $('#tweets').append($tweet)
  }
}

function loadTweets(){
  $.ajax({
    url: '/tweets/',
    method: 'GET',
    success: function ($tweets) {
      $('#tweets').empty()
      renderTweets($tweets)
    }
  })
}

function verifyNew() {
  console.log(+$('#counter').text())
  if (+$('#counter').text() < 0) {
    let warning = '<div class="verify error">140 characters max</div>'
    $('.verify').empty()
    $('#new-tweet').find('input').after(warning)
    return false
  } else if (+$('#counter').text() == 140){
    let warning = '<div class="verify error">Please input text to tweet</div>'
    $('.verify').empty()
    $('#new-tweet').find('input').after(warning)
    return false
  } else {
    $('.verify').empty()
    return true
  }
}

$(
  function() {
    loadTweets()

    // post new tweet
    $('#new-tweet').find('input').on('click', function(evt){
      evt.preventDefault()
      if (verifyNew()){
        var content = $('#new-tweet').find('form').serialize()
        $.ajax({
          url: '/tweets/',
          method: 'POST',
          data: content,
          success: function () {
            $('textarea').val('')
            loadTweets()
          }
        })
      }
    })
})