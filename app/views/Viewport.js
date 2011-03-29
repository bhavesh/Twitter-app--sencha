twitter.Viewport = Ext.extend(Ext.Panel, {
  id        : 'viewport',
  layout    : 'card',
  fullscreen: true,

  initComponent: function() {
      Ext.apply(this, {
          dockedItems: [
            {
              dock : 'left',
              xtype: 'searchBar',
              width: 250
            }
          ]
      });
      twitter.Viewport.superclass.initComponent.apply(this, arguments);
  }
});

