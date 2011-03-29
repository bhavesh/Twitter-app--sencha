twitter.views.TimeLine = Ext.extend(Ext.List, {
  cls: 'timeline',
  emptyText   : '<p class="no-searches">No tweets found matching that search</p>',

  disableSelection: true,

  plugins: [
      {
          ptype: 'listpaging',
          autoPaging: false
      }, {
          ptype: 'pullrefresh'
      }
  ],

    itemCls: 'tweet',
    itemTpl: new Ext.XTemplate(
      '<img src="{profile_image_url}" />',

      '<div class="x-tweetanchor"></div>',
      '<div class="tweet-bubble">',
        '<div class="tweet-content">',
          '<h2>{from_user}</h2>',
          '<p>{text:this.linkify}</p><strong></strong>',
          '<span class="posted">{created_at}</span>',
        '</div>',
      '</div>',
      {
       linkify: function(value) {
              return value.replace(/(http:\/\/[^\s]*)/g, "<a target=\"_blank\" href=\"$1\">$1</a>");
          }
      }
    )
});

Ext.reg('tweetsList', twitter.views.TimeLine);
