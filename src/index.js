let vdom = require('./core/vdom')();

module.exports = function() {
    var sampleTemplate = require('./template/sample.html.hbs')({ name: 'Ram' });
    // var sampleTemplate = require('./template/list-1.html.hbs')({ name: 'Ram' });
    let $root = document.getElementById('root');
    vdom.updateDOM($root, sampleTemplate);
    setTimeout(() => {
        let $root = document.getElementById('root');
        var sampleTemplate2 = require('./template/sample_2.html.hbs')({ name: 'Ram-VDOM' });
        // var sampleTemplate2 = require('./template/list-1.html.hbs')({ name: 'Ram-500' });
        vdom.updateDOM($root, sampleTemplate2);
    }, 2000)
}
