/**
 * Created by liumapp on ${DATE} .
 * E-mail:liumapp.com@gmail.com
 * home-page:http://www.liumapp.com
 */
var sjp = {};

sjp.install = function (Vue, options) {

  var opt = {
    defaultType: "generateInfo",
    store: null,
    $: null,
    url: 'http://localhost:9080/'
  };

  for (property in options) {
    opt[property] = options[property]
  };

  Vue.prototype.$sjp = function (tips , type) {

    var curType = type ? type : opt.defaultType

    switch (curType) {
      case 'generateInfo':
        generateInfo()
        break;
      default:
        console.log('get the wrong type !')
    }

  };

  ['generateInfo'].forEach(function (type){
    Vue.prototype.$sjp[type] = function (tips) {
      return Vue.prototype.$sjp(tips , type)
    }
  });

  var generateInfo = function () {

    opt.$.ajax({
      type:"get",
      async:false,
      url:opt.url,
      dataType:'jsonp',
      jsonpCallback:'callback',
      success: function (json) {

        console.log(json);

        opt.store.commit('setStatus' , {
          status: json.status
        });

        opt.store.commit('setContent' , {
          content: json.content
        });

        opt.store.commit('setMsg' , {
          msg: json.message
        });
      },
      error: function (error) {
        console.log('something wrong')
      }
    })

  }



}

module.exports = sjp
