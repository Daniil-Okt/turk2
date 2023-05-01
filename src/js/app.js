/*
!(i) 
Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
Или когда импортирован весь файл, например import "files/script.js";
Неиспользуемый (не вызванный) код в итоговый файл не попадает.

Если мы хотим добавить модуль следует его расскоментировать
*/
import {
  isWebp,
  headerFixed,
  togglePopupWindows,
  addTouchClass,
  addLoadedClass,
  menuInit,
} from './modules'
/* Раскомментировать для использования */
// import { MousePRLX } from './libs/parallaxMouse'

/* Раскомментировать для использования */
// import AOS from 'aos'

/* Раскомментировать для использования */
import Swiper, { Navigation, Pagination, } from 'swiper'

// Включить/выключить FLS (Full Logging System) (в работе)
window['FLS'] = true

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML
! (i) необходимо для корректного отображения webp из css 
*/
isWebp()
/* Добавление класса touch для HTML если браузер мобильный */
/* Раскомментировать для использования */
// addTouchClass();
/* Добавление loaded для HTML после полной загрузки страницы */
/* Раскомментировать для использования */
// addLoadedClass();
/* Модуль для работы с меню (Бургер) */
/* Раскомментировать для использования */
menuInit()

/* Библиотека для анимаций ===============================================================================
 *  документация: https://michalsnik.github.io/aos
 */
// AOS.init();
// =======================================================================================================

// Паралакс мышей ========================================================================================
// const mousePrlx = new MousePRLX({})
// =======================================================================================================

// Фиксированный header ==================================================================================
// headerFixed()
// =======================================================================================================

/* Открытие/закрытие модальных окон ======================================================================
* Чтобы модальное окно открывалось и закрывалось
* На окно повешай атрибут data-popup="<название окна>"
* И на кнопку, которая вызывает окно так же повешай атрибут data-type="<название окна>"

* На обертку(враппер) окна добавь класс _overlay-bg
* На кнопку для закрытия окна добавь класс button-close
*/
/* Раскомментировать для использования */
togglePopupWindows()
// =======================================================================================================

/*Динамический адаптив ===================================================================================
* Что бы перебросить блок в другой блок, повешай на него атрибут:
* data-da="class блока куда нужно перебросить, брекпоинт(ширина экрана), позиция в блоке(цифра либо first,last)"
*/
/*Расскоментировать для использования*/
import { useDynamicAdapt } from './modules/dynamicAdapt.js'
useDynamicAdapt()
// =======================================================================================================




/*Открытие/закрытие блоков spollers =======================================================================
// https://youtu.be/0fg9bZcL1RM
* Чтобы блок sollers открывался и закрывался
* На блок-оболочку спойллера и кнопку/заголовок, которая открывает и закрывает spollers
* Повешай атрибут data-spollers(на блок-оболочку) и data-spoller(на кнопку/заголовок)
* Если нужно что б spollers работал на определенной ширине экрана
* Добавь для атрибута блока значение в виде data-spollers="<ширина экрана, тип медиа запроса (min/max)"
* Для того что бы спойлер по умолчанию был открыть, следует к нужному блоку дописать класс "_active"
// ! Следует писать в HTML блок спойллера после кнопки/заголовки (иначе работать спойллер не будет)
// ! Визуальные атрибуты спойллера добавляются по классу "._init"
*/
/* Раскомментировать для использования */
// spollerInit()

// =======================================================================================================

const swiper = new Swiper('.kwis__swiper', {
  modules: [Pagination, Navigation],
  speed: 400,
  spaceBetween: 100,

  navigation: {
    nextEl: '.kwis__button-for',
    prevEl: '.kwis__button-back',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
  },
  autoHeight: true,
  simulateTouch: false,
});

let buttonNext = document.querySelector('.kwis__button-for')
let optionInput = document.querySelectorAll('.option-kwis__input')
optionInput.forEach(input => {
    input.addEventListener('click',  ()=> {
        if (input.checked) {
            buttonNext.click()
        }
    })
});
// let buttonFormKwis = document.querySelector('.form-kwis__button')
// buttonFormKwis.addEventListener('click', () => {
//     buttonNext.click()
// })
// =============================
// Обработки окна заказа звонка
let popupGrat = document.querySelector('.popup-kwis-grat')
document.addEventListener('DOMContentLoaded', () => {
  const popupForm = document.getElementById('popupForm')
  let popupBody = document.querySelector('.popup-form')
  popupForm.addEventListener('submit', formSend)

  // функция обработки формы
  async function formSend(e) { 
    e.preventDefault()

    let error = formValidate(popupForm)

    let formData = new FormData(popupForm)

        if (error === 0) {
        //   отправка полученных данных с формы в файл php
          let respomse = await fetch('send.php', {
              method: 'POST',
              body: formData
          })
            popupForm.reset()
            popupBody.classList.remove('_is-open')
            popupGrat.classList.add('_is-open')
        }
    }
    function formValidate(popup) {
    let error = 0;
    // технический класс который нужно добавиь на те инпуты которые нужно проверять
    let formReq = popupBody.querySelectorAll('._req')
    for (let index = 0; index < formReq.length; index++) {
        const input = formReq[index];
        //вначале убираем класс error с инпута
        formRemoveError(input)

        //проверка инпуста с email, нужно добавить класс к инпуту

        if (input.classList.contains('_email')) {
            //проверка или email соответствует
            if (emailTest(input)) {
                //если проверка не прохожит до добавляетм класс ошибки
                formAddError(input)
                error++
            }
                //проверяем или является чек боксом
                //проверка что это чекбок       проверка что этот чекбокс не влючен
            } else if(input.getAttribute("type") === "checkbox" && input.checked === false) {
                //добавляем к нему класс ошибки 
                formAddError(input)
                error++
            } else if (input.value === '') {
            //проверка всех остальных инпутов заполнены они или нет
                formAddError(input)
                error++
            }
        }
        return error
    }


    //функции добавление и удаление класса ошибки
    function formAddError(input) {
        input.parentElement.classList.add('_error')
        input.classList.add('_error')
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error')
        input.classList.remove('_error')
    }
})




// Обработки формы квиза
document.addEventListener('DOMContentLoaded', () => {
    const formKwis = document.getElementById('form-kwis')
    let popupKwis = document.querySelector('.kwis')
    formKwis.addEventListener('submit', formSend)
    
    // функция обработки формы
    async function formSend(e) { 
      e.preventDefault()
  
      let error = formValidate(popupKwis)
  
    //   let formData = new FormData(popupKwis)
  
        if (error === 0) {
        //   отправка полученных данных с формы в файл php
            // let respomse = await fetch('../static/sendmail.php', {
            //     method: 'POST',
            //     body: formData
            // })
            formKwis.reset()
            popupKwis.classList.remove('_is-open')
            popupGrat.classList.add('_is-open')
        }
    }

    function formValidate(popup) {
      let error = 0;
      // технический класс который нужно добавиь на те инпуты которые нужно проверять
      let formReq = popupKwis.querySelectorAll('._req')
      for (let index = 0; index < formReq.length; index++) {
          const input = formReq[index];
          //вначале убираем класс error с инпута
          formRemoveError(input)
  
          //проверка инпуста с email, нужно добавить класс к инпуту
  
          if (input.classList.contains('_email')) {
              //проверка или email соответствует
              if (emailTest(input)) {
                  //если проверка не прохожит до добавляетм класс ошибки
                  formAddError(input)
                  error++
              }
                  //проверяем или является чек боксом
                  //проверка что это чекбок       проверка что этот чекбокс не влючен
              } else if(input.getAttribute("type") === "checkbox" && input.checked === false) {
                  //добавляем к нему класс ошибки 
                  formAddError(input)
                  error++
              } else if (input.value === '') {
              //проверка всех остальных инпутов заполнены они или нет
                  formAddError(input)
                  error++
              }
          }
          return error
      }
  
  
  //функции добавление и удаление класса ошибки
  function formAddError(input) {
      input.parentElement.classList.add('_error')
      input.classList.add('_error')
  }
  function formRemoveError(input) {
      input.parentElement.classList.remove('_error')
      input.classList.remove('_error')
  }
  })

