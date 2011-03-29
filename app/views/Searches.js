twitter.views.Searches = Ext.extend(Ext.List, {
  cls: 'searches',
  allowDeselect: false,
  singleSelect: true,
  
  activeCls: 'search-item-active',
    
  itemTpl: [
    '<div class="search-item">',
        '<div class="action delete x-button">Delete</div>',
        '<span>{query}</span>',
    '</div>'
  ],
    
  initComponent: function() {
    Ext.apply(this, {
        store: Ext.getStore('Searches')
    });

    twitter.views.Searches.superclass.initComponent.apply(this, arguments);
    
    this.enableBubble('selectionchange');
    
    this.on({
        scope: this,
        itemswipe: this.onItemSwipe,
        containertap: this.deactivateAll
    });
  },
    
    
    onItemTap: function(item, index, e) {
      if (e.getTarget('.' + this.activeCls + ' div.delete')) {
          var store    = this.store,
              selModel = this.getSelectionModel(),
              instance = store.getAt(index),
              selected = selModel.isSelected(instance),
              nearest  = store.getAt(index + 1) || store.getAt(index - 1);
          
          //if the item we are removing is currently selected, select the nearest item instead
          if (selected && nearest) {
              selModel.select(nearest);
          }
          
          store.removeAt(index);
          store.sync();
        
          if (!nearest) {
              Ext.redirect('searches/first');
          }
      } else {
          this.deactivateAll();
          
          return twitter.views.Searches.superclass.onItemTap.apply(this, arguments);
      }
    },
    
    
    deactivateAll: function() {
      Ext.select('div.search-item', this.el.dom).removeCls(this.activeCls);
    },
    
    onItemSwipe: function(list, index, node) {
      var el        = Ext.get(node),
          activeCls = this.activeCls,
          hasClass  = el.hasCls(activeCls);
      
      this.deactivateAll();
      
      if (hasClass) {
          el.removeCls(activeCls);
      } else {
          el.addCls(activeCls);
      }
    }
});

Ext.reg('searchesList', twitter.views.Searches);