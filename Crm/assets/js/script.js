'use strict';

function domReady() {
 tabsInit();
 searchList();
 moreInfo();
 headerPadding();
}

function tabsInit() {
 Toggler.Init({
  CLASS_TARGET_VISIBLE: 'active'
 });
}

function headerPadding() {
 let headerBtn = document.querySelector('.js_btn_wrap'),
   headerTitle = document.querySelector('.js_title_wrap'),
   media = window.matchMedia('(min-width: 576px)');
 if (media.matches) {
  headerTitle.style.right = headerBtn.offsetWidth / 2 + 'px';
 } else {
  headerTitle.style.right = '0';
 }
}

function searchList() {
 let userList = new List('Applications', {
  valueNames: ['js_title', 'js_role', 'js_service', 'js_company', 'js_status', 'js_date']
 });
}

function moreInfo() {
 document.addEventListener('click', function(event) {
  let btnMore = document.querySelectorAll('.js_more'),
    target = event.target;
  Array.prototype.slice.call(btnMore).forEach(function(element) {
   if (target !== element) {
    element.classList.remove('show');
   } else if (target === element && target.classList.contains('show')) {
    target.classList.remove('show');
   } else if (target === element && !target.classList.contains('show')) {
    target.classList.add('show');
   }
  });
 });
}

window.addEventListener('resize', headerPadding);
document.addEventListener('DOMContentLoaded', domReady);