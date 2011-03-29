twitter.views.SearchBar = Ext.extend(Ext.Panel, {

    layout: 'fit',

    initComponent: function() {
        Ext.apply(this, {
            items: [
                {
                    xtype: 'searchesList' //custom Component 
                }
            ],
            
            dockedItems: {
                dock   : 'top',
                xtype  : 'form',
                cls    : 'x-toolbar-dark',
                baseCls: 'x-toolbar',
                height : 45,
                itemId : 'newQueryForm',
                
                listeners: {
                    el: {
                        scope : this,
                        submit: this.onSubmit
                    }
                },
                
                items: {
                    xtype : 'searchfield',
                    name  : 'query',
                    itemId: 'newQueryField',
                    placeHolder: 'Search...'
                }
            }
        });
    
        twitter.views.SearchBar.superclass.initComponent.apply(this, arguments);
    },
    
    onSubmit: function() {
        var list   = this.down('.searchesList'),
            field  = this.down('#newQueryField'),
            store  = list.store,
            query  = field.getValue(),
            index  = store.find('query', query, 0, false, false, true),
            instance;
        
        if (index == -1) {
            instance = store.create({query: query});
        } else {
            instance = store.getAt(index);
        }
        
        field.setValue("");
        
        list.getSelectionModel().select(instance);
    }
});

Ext.reg('searchBar', twitter.views.SearchBar);