
function createTweetElement(tweet) {
  let date = new Date(tweet.created_at)
  // let safeText = $("<div>").text(tweet.content.text)
  let tweetEl = `<article class='single tweet' data-id=${tweet._id} data-liked=${tweet.liked}>
  <header>
    <img src='${tweet.user.avatars.regular}' class='avatar'><h2 class='username'>${tweet.user.name}</h2><span class='handle'>${tweet.user.handle}</span>
  </header>
  <div class='content'>${tweet.content.text}</div>
  <footer><p>${date}</p>
    <span class='actions'>
      <img src='/images/flag.png' class="flag">
      <img src='/images/retweet.png' class="retweet">`
      if (tweet.liked == 'true') {
        tweetEl += `<button data-liked='false' data-id=${tweet._id}><img src='/images/heart.png' class="like liked"></button>`
      } else {
        tweetEl += `<button method="POST" action="/tweets/?_method=PUT" data-liked=true type="submit" data-id=${tweet._id}><img src='/images/heart.png' class="like"></button>`
      }
      tweetEl += `
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
    let $tweet = createTweetElement(tweets[tweet])
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

    $('#compose').on('click', function() {
      $('#new-tweet').toggle('slow', function(){
        $('#new-tweet').find('textarea').focus()
      })
    })

    $('#new-tweet').find('input').on('click', function(evt){
      evt.preventDefault()
      if (verifyNew()){
        let content = $('#new-tweet').find('form').serialize()
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

    $('#tweets').on('click', 'button', function(evt){
        evt.preventDefault()
        console.log(`clicked ${$(this).data('id')}`)
        let data = {
          id: $(this).data('id'),
          liked: $(this).data('liked')
        }
        console.log(data)
        $.ajax({
          url: '/tweets/',
          method: 'PUT',
          data: data,
          success: function () {
              $('textarea').val('')
            loadTweets()
          }
        })

    })
})