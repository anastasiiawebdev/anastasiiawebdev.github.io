(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

(function ($) {
  function domReady() {
    requestForm();
  }

  function requestForm() {
    $('form[name=\'request\']').validate({
      rules: {
        phone: {
          required: true,
          phoneUkraine: true
        },
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        phone: '',
        email: ''
      },
      highlight: function highlight(element, errorClass, validClass) {
        $(element).parent().addClass(errorClass);
      },
      unhighlight: function unhighlight(element, errorClass, validClass) {
        $(element).parent().removeClass(errorClass);
      },
      submitHandler: function submitHandler(form) {
        form.submit();
      }
    });
    $.validator.addMethod('phoneUkraine', function (phone_number, element) {
      phone_number = phone_number.replace(/\s+/g, '');
      return this.optional(element) || phone_number.length > 9 && phone_number.match(/^(\+?0-?)?(\([0-9]([0-9]\d|1[0-9])\)|[0-9]([0-9]\d|1[0-9]))-?[0-9]\d{2}-?\d{4}$/);
    });
  }

  $(domReady);
})(jQuery);

if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

if (!Array.from) {
  Array.from = function () {
    var toStr = Object.prototype.toString;
    var isCallable = function isCallable(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function toInteger(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function toLength(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };
    return function from(arrayLike) {
      var C = this;
      var items = Object(arrayLike);
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T = void 0;
      if (typeof mapFn !== 'undefined') {
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }
      var len = toLength(items.length);
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      var k = 0;
      var kValue = void 0;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      A.length = len;
      return A;
    };
  }();
}

function domReady() {
  var forms = Array.from(document.querySelectorAll('.form-request'));
  Array.prototype.slice.call(forms).forEach(function (item) {
    new CustomRequest(item);
  });
  textareaHeight();
  headerChange();
  customVideo();
  videoContentPaddingTop();
  mouseoverListener();
}

function getBlock(el) {
  if ('classList' in el && !el.classList.contains('js_service')) {
    return getBlock(el.parentNode);
  } else if (el.className !== undefined) {
    return el.id;
  } else {
    return null;
  }
}

function mouseoverListener() {
  document.addEventListener('mouseover', function (e) {
    var mq = window.matchMedia('(min-width: 768px)');
    if (mq.matches) {
      var block = getBlock(e.target);
      var serviceModalCol = document.querySelectorAll('.js_details');
      Array.prototype.slice.call(serviceModalCol).forEach(function (item) {
        var itemParent = item.parentNode;
        if (block) {
          if (item.id.includes(block)) {
            item.classList.add('show');
            itemParent.classList.add('show');
          } else {
            item.classList.remove('show');
            itemParent.classList.remove('show');
          }
        } else if (block === null) {
          item.classList.remove('show');
          itemParent.classList.remove('show');
        }
      });
    } else {
      return;
    }
  });
}

function CustomRequest(element) {
  this.inputs = Array.from(element.querySelectorAll('input[type="text"], textarea'));
  Array.prototype.slice.call(this.inputs).forEach(function (input) {
    input.addEventListener('focus', function () {
      input.parentNode.classList.add('active');
    });
  });
  Array.prototype.slice.call(this.inputs).forEach(function (input) {
    input.addEventListener('focusout', function () {
      if (input.value === '') {
        input.parentNode.classList.remove('active');
      }
    });
  });
}

function textareaHeight() {
  var checkboxGroup = document.querySelector('.js_checkbox_group'),
      formRequestColLeft = document.querySelector('.js_form_col_left'),
      textareaWrap = document.querySelector('.js_textarea_wrap'),
      textareaBlockHeight = formRequestColLeft.offsetHeight - checkboxGroup.offsetHeight;
  textareaWrap.style.height = textareaBlockHeight - 30 + 'px';
}

function headerChange() {
  document.addEventListener('scroll', function () {
    var header = document.getElementById('header');
    if (window.pageYOffset > 20 || document.documentElement.scrollTop > 20) {
      header.classList.add('header_change');
    } else {
      header.classList.remove('header_change');
    }
  });
}

function customVideo() {
  document.addEventListener('click', function () {
    var videoBtns = document.querySelectorAll('.js_video_btn');
    Array.prototype.slice.call(videoBtns).forEach(function (element) {
      if (event.target === element) {
        var elementParentChildrenArray = Array.from(element.parentNode.children);
        for (var i = 0; i < elementParentChildrenArray.length; i++) {
          if (elementParentChildrenArray[i].classList.contains('js_video')) {
            if (elementParentChildrenArray[i].paused || elementParentChildrenArray[i].ended) {
              element.title = 'pause';
              element.classList.add('pause');
              elementParentChildrenArray[i].play();
            } else {
              element.title = 'play';
              element.classList.remove('pause');
              elementParentChildrenArray[i].pause();
            }
          }
        }
      }
    });
  });
}

function videoContentPaddingTop() {
  var videoInfo = document.getElementById('video_info'),
      header = document.getElementById('header'),
      anchor = document.querySelectorAll('.anchor');
  videoInfo.style.paddingTop = header.offsetHeight + 75 + 'px';
  Array.prototype.slice.call(anchor).forEach(function (element) {
    element.style.height = header.offsetHeight + 'px';
    element.style.marginTop = -header.offsetHeight + 'px';
  });
}

window.addEventListener('resize', function () {
  mouseoverListener();
});
document.addEventListener('DOMContentLoaded', domReady);

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNzZXRzL2pzL2NvbW1vbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsQ0FBQyxVQUFTLENBQVQsRUFBWTtBQUNaLFdBQVMsUUFBVCxHQUFvQjtBQUNuQjtBQUNBOztBQUVELFdBQVMsV0FBVCxHQUF1QjtBQUN0QixNQUFFLHdCQUFGLEVBQTRCLFFBQTVCLENBQXFDO0FBQ3BDLGFBQU87QUFDTixlQUFPO0FBQ04sb0JBQVUsSUFESjtBQUVOLHdCQUFjO0FBRlIsU0FERDtBQUtOLGVBQU87QUFDTixvQkFBVSxJQURKO0FBRU4saUJBQU87QUFGRDtBQUxELE9BRDZCO0FBV3BDLGdCQUFVO0FBQ1QsZUFBTyxFQURFO0FBRVQsZUFBTztBQUZFLE9BWDBCO0FBZXBDLGlCQUFXLG1CQUFTLE9BQVQsRUFBa0IsVUFBbEIsRUFBOEIsVUFBOUIsRUFBMEM7QUFDcEQsVUFBRSxPQUFGLEVBQVcsTUFBWCxHQUFvQixRQUFwQixDQUE2QixVQUE3QjtBQUNBLE9BakJtQztBQWtCcEMsbUJBQWEscUJBQVMsT0FBVCxFQUFrQixVQUFsQixFQUE4QixVQUE5QixFQUEwQztBQUN0RCxVQUFFLE9BQUYsRUFBVyxNQUFYLEdBQW9CLFdBQXBCLENBQWdDLFVBQWhDO0FBQ0EsT0FwQm1DO0FBcUJwQyxxQkFBZSx1QkFBUyxJQUFULEVBQWU7QUFDN0IsYUFBSyxNQUFMO0FBQ0E7QUF2Qm1DLEtBQXJDO0FBeUJBLE1BQUUsU0FBRixDQUFZLFNBQVosQ0FBc0IsY0FBdEIsRUFBc0MsVUFBUyxZQUFULEVBQXVCLE9BQXZCLEVBQWdDO0FBQ3JFLHFCQUFlLGFBQWEsT0FBYixDQUFxQixNQUFyQixFQUE2QixFQUE3QixDQUFmO0FBQ0EsYUFBTyxLQUFLLFFBQUwsQ0FBYyxPQUFkLEtBQTBCLGFBQWEsTUFBYixHQUFzQixDQUF0QixJQUMvQixhQUFhLEtBQWIsQ0FBbUIsaUZBQW5CLENB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QVAsR0FBc0IsRUFBdEIsR0FBMkIsSUFBeEQ7QUFDQSxRQUFNLFNBQU4sQ0FBZ0IsS0FBaEIsQ0FBc0IsSUFBdEIsQ0FBMkIsTUFBM0IsRUFBbUMsT0FBbkMsQ0FBMkMsVUFBUyxPQUFULEVBQWtCO0FBQzVELFlBQVEsS0FBUixDQUFjLE1BQWQsR0FBdUIsT0FBTyxZQUFQLEdBQXNCLElBQTdDO0FBQ0EsWUFBUSxLQUFSLENBQWMsU0FBZCxHQUEwQixDQUFFLE9BQU8sWUFBVCxHQUF3QixJQUFsRDtBQUNBLEdBSEQ7QUFJQTs7QUFFRCxPQUFPLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFlBQVc7QUFDNUM7QUFDQSxDQUZEO0FBR0EsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsUUFBOUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIoZnVuY3Rpb24oJCkge1xyXG4gZnVuY3Rpb24gZG9tUmVhZHkoKSB7XHJcbiAgcmVxdWVzdEZvcm0oKTtcclxuIH1cclxuXHJcbiBmdW5jdGlvbiByZXF1ZXN0Rm9ybSgpIHtcclxuICAkKCdmb3JtW25hbWU9XFwncmVxdWVzdFxcJ10nKS52YWxpZGF0ZSh7XHJcbiAgIHJ1bGVzOiB7XHJcbiAgICBwaG9uZToge1xyXG4gICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgIHBob25lVWtyYWluZTogdHJ1ZVxyXG4gICAgfSxcclxuICAgIGVtYWlsOiB7XHJcbiAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgZW1haWw6IHRydWVcclxuICAgIH1cclxuICAgfSxcclxuICAgbWVzc2FnZXM6IHtcclxuICAgIHBob25lOiAnJyxcclxuICAgIGVtYWlsOiAnJ1xyXG4gICB9LFxyXG4gICBoaWdobGlnaHQ6IGZ1bmN0aW9uKGVsZW1lbnQsIGVycm9yQ2xhc3MsIHZhbGlkQ2xhc3MpIHtcclxuICAgICQoZWxlbWVudCkucGFyZW50KCkuYWRkQ2xhc3MoZXJyb3JDbGFzcyk7XHJcbiAgIH0sXHJcbiAgIHVuaGlnaGxpZ2h0OiBmdW5jdGlvbihlbGVtZW50LCBlcnJvckNsYXNzLCB2YWxpZENsYXNzKSB7XHJcbiAgICAkKGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKGVycm9yQ2xhc3MpO1xyXG4gICB9LFxyXG4gICBzdWJtaXRIYW5kbGVyOiBmdW5jdGlvbihmb3JtKSB7XHJcbiAgICBmb3JtLnN1Ym1pdCgpO1xyXG4gICB9XHJcbiAgfSk7XHJcbiAgJC52YWxpZGF0b3IuYWRkTWV0aG9kKCdwaG9uZVVrcmFpbmUnLCBmdW5jdGlvbihwaG9uZV9udW1iZXIsIGVsZW1lbnQpIHtcclxuICAgcGhvbmVfbnVtYmVyID0gcGhvbmVfbnVtYmVyLnJlcGxhY2UoL1xccysvZywgJycpO1xyXG4gICByZXR1cm4gdGhpcy5vcHRpb25hbChlbGVtZW50KSB8fCBwaG9uZV9udW1iZXIubGVuZ3RoID4gOSAmJlxyXG4gICAgIHBob25lX251bWJlci5tYXRjaCgvXihcXCs/MC0/KT8oXFwoWzAtOV0oWzAtOV1cXGR8MVswLTldKVxcKXxbMC05XShbMC05XVxcZHwxWzAtOV0pKS0/WzAtOV1cXGR7Mn0tP1xcZHs0fSQvKTtcclxuICB9KTtcclxuIH1cclxuXHJcbiAkKGRvbVJlYWR5KTtcclxufSkoalF1ZXJ5KTtcclxuXHJcbmlmICghU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlcykge1xyXG4gU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uKHNlYXJjaCwgc3RhcnQpIHtcclxuICBpZiAodHlwZW9mIHN0YXJ0ICE9PSAnbnVtYmVyJykge1xyXG4gICBzdGFydCA9IDA7XHJcbiAgfVxyXG5cclxuICBpZiAoc3RhcnQgKyBzZWFyY2gubGVuZ3RoID4gdGhpcy5sZW5ndGgpIHtcclxuICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0gZWxzZSB7XHJcbiAgIHJldHVybiB0aGlzLmluZGV4T2Yoc2VhcmNoLCBzdGFydCkgIT09IC0xO1xyXG4gIH1cclxuIH07XHJcbn1cclxuXHJcbmlmICghQXJyYXkuZnJvbSkge1xyXG4gQXJyYXkuZnJvbSA9IChmdW5jdGlvbigpIHtcclxuICBsZXQgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xyXG4gIGxldCBpc0NhbGxhYmxlID0gZnVuY3Rpb24oZm4pIHtcclxuICAgcmV0dXJuIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyB8fCB0b1N0ci5jYWxsKGZuKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcclxuICB9O1xyXG4gIGxldCB0b0ludGVnZXIgPSBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICBsZXQgbnVtYmVyID0gTnVtYmVyKHZhbHVlKTtcclxuICAgaWYgKGlzTmFOKG51bWJlcikpIHsgcmV0dXJuIDA7IH1cclxuICAgaWYgKG51bWJlciA9PT0gMCB8fCAhaXNGaW5pdGUobnVtYmVyKSkgeyByZXR1cm4gbnVtYmVyOyB9XHJcbiAgIHJldHVybiAobnVtYmVyID4gMCA/IDEgOiAtMSkgKiBNYXRoLmZsb29yKE1hdGguYWJzKG51bWJlcikpO1xyXG4gIH07XHJcbiAgbGV0IG1heFNhZmVJbnRlZ2VyID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcclxuICBsZXQgdG9MZW5ndGggPSBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICBsZXQgbGVuID0gdG9JbnRlZ2VyKHZhbHVlKTtcclxuICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KGxlbiwgMCksIG1heFNhZmVJbnRlZ2VyKTtcclxuICB9O1xyXG4gIHJldHVybiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZSkge1xyXG4gICBsZXQgQyA9IHRoaXM7XHJcbiAgIGxldCBpdGVtcyA9IE9iamVjdChhcnJheUxpa2UpO1xyXG4gICBpZiAoYXJyYXlMaWtlID09IG51bGwpIHtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FycmF5LmZyb20gcmVxdWlyZXMgYW4gYXJyYXktbGlrZSBvYmplY3QgLSBub3QgbnVsbCBvciB1bmRlZmluZWQnKTtcclxuICAgfVxyXG4gICBsZXQgbWFwRm4gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHZvaWQgdW5kZWZpbmVkO1xyXG4gICBsZXQgVDtcclxuICAgaWYgKHR5cGVvZiBtYXBGbiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIGlmICghaXNDYWxsYWJsZShtYXBGbikpIHtcclxuICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5mcm9tOiB3aGVuIHByb3ZpZGVkLCB0aGUgc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG4gICAgfVxyXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKSB7XHJcbiAgICAgVCA9IGFyZ3VtZW50c1syXTtcclxuICAgIH1cclxuICAgfVxyXG4gICBsZXQgbGVuID0gdG9MZW5ndGgoaXRlbXMubGVuZ3RoKTtcclxuICAgbGV0IEEgPSBpc0NhbGxhYmxlKEMpID8gT2JqZWN0KG5ldyBDKGxlbikpIDogbmV3IEFycmF5KGxlbik7XHJcblxyXG4gICBsZXQgayA9IDA7XHJcbiAgIGxldCBrVmFsdWU7XHJcbiAgIHdoaWxlIChrIDwgbGVuKSB7XHJcbiAgICBrVmFsdWUgPSBpdGVtc1trXTtcclxuICAgIGlmIChtYXBGbikge1xyXG4gICAgIEFba10gPSB0eXBlb2YgVCA9PT0gJ3VuZGVmaW5lZCcgPyBtYXBGbihrVmFsdWUsIGspIDpcclxuICAgICAgIG1hcEZuLmNhbGwoVCwga1ZhbHVlLCBrKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgQVtrXSA9IGtWYWx1ZTtcclxuICAgIH1cclxuICAgIGsgKz0gMTtcclxuICAgfVxyXG4gICBBLmxlbmd0aCA9IGxlbjtcclxuICAgcmV0dXJuIEE7XHJcbiAgfTtcclxuIH0oKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvbVJlYWR5KCkge1xyXG4gbGV0IGZvcm1zID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9ybS1yZXF1ZXN0JykpO1xyXG4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZm9ybXMpLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gIG5ldyBDdXN0b21SZXF1ZXN0KGl0ZW0pO1xyXG4gfSk7XHJcbiB0ZXh0YXJlYUhlaWdodCgpO1xyXG4gaGVhZGVyQ2hhbmdlKCk7XHJcbiBjdXN0b21WaWRlbygpO1xyXG4gdmlkZW9Db250ZW50UGFkZGluZ1RvcCgpO1xyXG4gbW91c2VvdmVyTGlzdGVuZXIoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0QmxvY2soZWwpIHtcclxuIGlmICgnY2xhc3NMaXN0JyBpbiBlbCAmJiAhZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdqc19zZXJ2aWNlJykpIHtcclxuICByZXR1cm4gZ2V0QmxvY2soZWwucGFyZW50Tm9kZSk7XHJcbiB9IGVsc2UgaWYgKGVsLmNsYXNzTmFtZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgcmV0dXJuIGVsLmlkO1xyXG4gfSBlbHNlIHtcclxuICByZXR1cm4gbnVsbDtcclxuIH1cclxufVxyXG5cclxuZnVuY3Rpb24gbW91c2VvdmVyTGlzdGVuZXIoKSB7XHJcbiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbihlKSB7XHJcbiAgY29uc3QgbXEgPSB3aW5kb3cubWF0Y2hNZWRpYSgnKG1pbi13aWR0aDogNzY4cHgpJyk7XHJcbiAgaWYgKG1xLm1hdGNoZXMpIHtcclxuICAgbGV0IGJsb2NrID0gZ2V0QmxvY2soZS50YXJnZXQpO1xyXG4gICBsZXQgc2VydmljZU1vZGFsQ29sID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzX2RldGFpbHMnKTtcclxuICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoc2VydmljZU1vZGFsQ29sKS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgIGxldCBpdGVtUGFyZW50ID0gaXRlbS5wYXJlbnROb2RlO1xyXG4gICAgaWYgKGJsb2NrKSB7XHJcbiAgICAgaWYgKGl0ZW0uaWQuaW5jbHVkZXMoYmxvY2spKSB7XHJcbiAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICBpdGVtUGFyZW50LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgICB9IGVsc2Uge1xyXG4gICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgICAgaXRlbVBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChibG9jayA9PT0gbnVsbCkge1xyXG4gICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgIGl0ZW1QYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgfVxyXG4gICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICByZXR1cm47XHJcbiAgfVxyXG4gfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEN1c3RvbVJlcXVlc3QoZWxlbWVudCkge1xyXG4gdGhpcy5pbnB1dHMgPSBBcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInRleHRcIl0sIHRleHRhcmVhJykpO1xyXG4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5pbnB1dHMpLmZvckVhY2goZnVuY3Rpb24oaW5wdXQpIHtcclxuICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsICgpID0+IHtcclxuICAgaW5wdXQucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICB9KTtcclxuIH0pO1xyXG4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5pbnB1dHMpLmZvckVhY2goZnVuY3Rpb24oaW5wdXQpIHtcclxuICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsICgpID0+IHtcclxuICAgaWYgKGlucHV0LnZhbHVlID09PSAnJykge1xyXG4gICAgaW5wdXQucGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgfVxyXG4gIH0pO1xyXG4gfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRleHRhcmVhSGVpZ2h0KCkge1xyXG4gbGV0IGNoZWNrYm94R3JvdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanNfY2hlY2tib3hfZ3JvdXAnKSxcclxuICAgZm9ybVJlcXVlc3RDb2xMZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX2Zvcm1fY29sX2xlZnQnKSxcclxuICAgdGV4dGFyZWFXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzX3RleHRhcmVhX3dyYXAnKSxcclxuICAgdGV4dGFyZWFCbG9ja0hlaWdodCA9IGZvcm1SZXF1ZXN0Q29sTGVmdC5vZmZzZXRIZWlnaHQgLSBjaGVja2JveEdyb3VwLm9mZnNldEhlaWdodDtcclxuIHRleHRhcmVhV3JhcC5zdHlsZS5oZWlnaHQgPSB0ZXh0YXJlYUJsb2NrSGVpZ2h0IC0gMzAgKyAncHgnO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoZWFkZXJDaGFuZ2UoKSB7XHJcbiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcicpO1xyXG4gIGlmICh3aW5kb3cucGFnZVlPZmZzZXQgPiAyMCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID4gMjApIHtcclxuICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlcl9jaGFuZ2UnKTtcclxuICB9IGVsc2Uge1xyXG4gICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGVhZGVyX2NoYW5nZScpO1xyXG4gIH1cclxuIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjdXN0b21WaWRlbygpIHtcclxuIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgbGV0IHZpZGVvQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qc192aWRlb19idG4nKTtcclxuICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh2aWRlb0J0bnMpLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICBpZiAoZXZlbnQudGFyZ2V0ID09PSBlbGVtZW50KSB7XHJcbiAgICBsZXQgZWxlbWVudFBhcmVudENoaWxkcmVuQXJyYXkgPSBBcnJheS5mcm9tKGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZHJlbik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRQYXJlbnRDaGlsZHJlbkFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgaWYgKGVsZW1lbnRQYXJlbnRDaGlsZHJlbkFycmF5W2ldLmNsYXNzTGlzdC5jb250YWlucygnanNfdmlkZW8nKSkge1xyXG4gICAgICBpZiAoZWxlbWVudFBhcmVudENoaWxkcmVuQXJyYXlbaV0ucGF1c2VkIHx8IGVsZW1lbnRQYXJlbnRDaGlsZHJlbkFycmF5W2ldLmVuZGVkKSB7XHJcbiAgICAgICBlbGVtZW50LnRpdGxlID0gJ3BhdXNlJztcclxuICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGF1c2UnKTtcclxuICAgICAgIGVsZW1lbnRQYXJlbnRDaGlsZHJlbkFycmF5W2ldLnBsYXkoKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgIGVsZW1lbnQudGl0bGUgPSAncGxheSc7XHJcbiAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3BhdXNlJyk7XHJcbiAgICAgICBlbGVtZW50UGFyZW50Q2hpbGRyZW5BcnJheVtpXS5wYXVzZSgpO1xyXG4gICAgICB9XHJcbiAgICAgfVxyXG4gICAgfVxyXG4gICB9XHJcbiAgfSk7XHJcblxyXG4gfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZpZGVvQ29udGVudFBhZGRpbmdUb3AoKSB7XHJcbiBsZXQgdmlkZW9JbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvX2luZm8nKSxcclxuICAgaGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcicpLFxyXG4gICBhbmNob3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYW5jaG9yJyk7XHJcbiB2aWRlb0luZm8uc3R5bGUucGFkZGluZ1RvcCA9IGhlYWRlci5vZmZzZXRIZWlnaHQgKyA3NSArICdweCc7XHJcbiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhbmNob3IpLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gIGVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVhZGVyLm9mZnNldEhlaWdodCArICdweCc7XHJcbiAgZWxlbWVudC5zdHlsZS5tYXJnaW5Ub3AgPSAtIGhlYWRlci5vZmZzZXRIZWlnaHQgKyAncHgnO1xyXG4gfSk7XHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcclxuIG1vdXNlb3Zlckxpc3RlbmVyKCk7XHJcbn0pO1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZG9tUmVhZHkpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl19
