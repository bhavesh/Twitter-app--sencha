Ext.regController("searches", {
    model: "Search",
    first: function() {
        var store = Ext.getStore('Searches'),
            first = store.first();
        
        if (first) {
            Ext.dispatch({
                controller: "searches",
                action    : "show",
                instance  : first,
                historyUrl: "searches/" + first.get('query')
            });
        } else {
            this.noSearches();
        }
    },
    
    show: function(options) {
        var search = options.instance,
            list   = this.list;
        
        if (!search) {
            search = new this.model({
                query: options.query.replace("%20", " ")
            });
        }
        
        this.highLightSearch(search.get('query'));
        
        var store = search.tweets();
        
        if (!list) {
            list = this.list = this.render({
                xtype: 'tweetsList',
                store: store
            });
        } else {
            list.scroller.scrollTo({x: 0, y: 0}, 700);
            list.bindStore(store);
        }
        
        Ext.getCmp('viewport').setActiveItem(list);
        
        store.load();
    },
    
    highLightSearch: function(query) {
        var list  = twitter.viewport.down('searchesList'),
            store = list.store,
            index = store.find('query', query, 0, false, false, true),
            record;
        
        if (index != -1) {
            record = store.getAt(index);
            
            var sm = list.getSelectionModel();
            sm.select(record, false, true);
        }
    },

    noSearches: function() {
        this.render({
            xtype: 'panel',
            cls  : 'no-searches',
            html : '<p>Make a search with the text field on the left</p>'
        });
    }
    
});
