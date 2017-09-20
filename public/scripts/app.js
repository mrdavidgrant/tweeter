/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweet) {
  var date = new Date(tweet.created_at)
  var safeText = $("<div>").text(tweet.content.text)
  var tweetEl = `<article class='single tweet'>
  <header>
    <img src='${tweet.user.avatars.regular}' class='avatar'><h2 class='username'>${tweet.user.name}</h2><span class='handle'>${tweet.user.handle}</span>
  </header>
  <div class='content'>${safeText}</div>
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
    $('#tweets').append($tweet).slideDown('slow')
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

    // show new-tweet form
    $('#compose').on('click', function() {
      $('#new-tweet').toggle('slow', function(){
        $('#new-tweet').find('textarea').focus()
      })
    })

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