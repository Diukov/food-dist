function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  let tabs = document.querySelectorAll(tabsSelector);
  let tabsContent = document.querySelectorAll(tabsContentSelector);
  let tabsParent = document.querySelector(tabsParentSelector);
       
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(index = 0) {
    tabsContent[index].classList.add('show', 'fade');
    tabsContent[index].classList.remove('hide');
    tabs[index].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((elem, index) => {
        if (target === elem) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });
}

export default tabs;
