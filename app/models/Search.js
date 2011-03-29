Ext.regModel("Search", {
    fields: [
        {name: "id",    type: "int"},
        {name: "query", type: "string"}
    ],
    
    hasMany: {
        model: "Tweet", 
        name : 'tweets',
        filterProperty: 'query',
        storeConfig: {
            pageSize: 15,
            remoteFilter: true,
            clearOnPageLoad: false
        }
    },
    
    proxy: {
        type: 'localstorage',
        id  : 'twitter-searches'
    }
});