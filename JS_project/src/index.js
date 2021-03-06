import './styles/styles.css'
import './styles/header.css'
import './styles/main.css'
import './styles/footer.css'

const li = document.createElement('li')
const figure = document.createElement('figure')
const img = document.createElement('img')
const body = document.querySelector('body')
const modalContainer = document.querySelector('.modal-container')
const registerForm = document.getElementById('register-form')
const loginBtn = document.getElementById('login-btn')
const registerBtn = document.getElementById('register-btn')
const modalCloseBtn = document.querySelector('.close-modal-btn')
const clearBtn = document.getElementById('clearBtn')
const inputs = document.querySelectorAll('input')
const termsCheckbox = document.getElementById('terms')
const scrollTopBtn = document.getElementById('scroll-top-btn')
const adsContainer = document.querySelector('.ads-container')
const makeBtn = document.getElementById('make-btn')
const modelBtn = document.getElementById('model-btn')
const yearBtn = document.getElementById('year-btn')
const makeList = document.getElementById('dropdown-make-list')
const modelList = document.getElementById('dropdown-model-list')
const yearList = document.getElementById('dropdown-year-list')
const resultBtn = document.getElementById('result-btn')
const resetBtn = document.getElementById('reset-btn')
const makeBtnOriginTextContent = makeBtn.firstChild.textContent
const modelBtnOriginTextContent = modelBtn.firstChild.textContent
const yearBtnOriginTextContent = yearBtn.firstChild.textContent
const carsData = fetch('http://localhost:3000/cars').then(response => response.json()).catch(e => console.log(e))
const usersData = fetch('http://localhost:3000/users').then(response => response.json()).catch(e => console.log(e))
let temporaryCount = 0
let temporaryIdsArray = []
const errorsContainer = {}

const state = {
    maxScroll: 240,
    count: 3,
    previuosCount: 3
}

const arrayAppendToList = (array, list) => {
    for (let i = 0; i < array.length; i++) {
        list.append(li.cloneNode(true))
    }

    for (let i = 0, li; i < list.children.length; i++) {
        li = list.children[i]
        li.classList.add('dropdown-content')
        li.append(array[i])
    }
    return array
}

const btnInnerTextChange = (btn, list, event) => {
    const target = event.target

    if (target.tagName === 'I') {
        list.classList.toggle('hidden')
        list.classList.toggle('active')
    }
    list.classList.toggle('hidden')
    list.classList.toggle('active')

    if (target.className === 'dropdown-content') {
        btn.firstChild.textContent = ''
        btn.firstChild.textContent = target.textContent

        if (btn === makeBtn) {
            modelBtn.classList.remove('background-grey')

            if (modelBtn.firstChild.textContent !== modelBtnOriginTextContent) {
                modelBtn.firstChild.textContent = modelBtnOriginTextContent
                yearBtn.firstChild.textContent = yearBtnOriginTextContent
                yearBtn.classList.add('background-grey')
            }
        }

        if (btn === modelBtn) {
            yearBtn.classList.remove('background-grey')
            yearBtn.firstChild.textContent = yearBtnOriginTextContent
        }
    }
}

const btnDropdownBarsAppend = (typeOfData, list) => {
    carsData.then(data => {
        const array = []

        for (let item of data) {
            if (!array.includes(item[typeOfData])) {
                array.push(item[typeOfData])
            }
        }

        arrayAppendToList(array.sort(), list)
    }).catch(e => console.log(e.message))
}

const btnGetInnerText = (btn) => btn.firstChild.textContent.toLowerCase().slice(0, -3)

const firstLetterToUpperCase = str => {
    if (!str) return str
  
    return str[0].toUpperCase() + str.slice(1)
}

const removeBtnListClassActive = (btn, list, target) => {
    if (target !== btn && target !== list) {
        list.classList.remove('active')
        list.classList.add('hidden')
    }
}

const backgroundClrGreyClassAdd = (btn, event) => {
    const target = event.target
    if (target === btn) {
        btn.classList.add('background-light-grey')
    }
} 

const backgroundClrGreyClassRemove = (btn, event) => {
    const target = event.target
    if (target === btn) {
        btn.classList.remove('background-light-grey')
    }
}

const addCardImage = (item, make, model) => {
    const lowerCasedMake = item.make.toLowerCase()
    const lowerCasedModel = item.model.toLowerCase()
    
    if (lowerCasedMake === make.toLowerCase() && lowerCasedModel === model.toLowerCase()) {
        if (lowerCasedModel.includes(' ')) {
            const stringReplacedSpace = lowerCasedModel.replace(/ /g, '-')
            img.classList.add('card-image')
            img.setAttribute('src', `./assets/images/${stringReplacedSpace}.png`)
            img.setAttribute('alt', `${lowerCasedModel} model image`)
            img.setAttribute('title', `${item.model}`)
            figure.prepend(img.cloneNode(true))
        } else {
            img.classList.add('card-image')
            img.setAttribute('src', `./assets/images/${lowerCasedModel}.png`)
            img.setAttribute('alt', `${lowerCasedModel} model image`)
            img.setAttribute('title', `${item.make} ${item.model}`)
            figure.prepend(img.cloneNode(true))
        }
    }
}

const createCarCardAndAppendToAds = (item) => {
    figure.classList.add('car-card')
    figure.innerHTML = `
    <figcaption>
    <p>Make: <b class='color-aqua'>${item.make}</b></p><hr>
    <p>Model: ${item.model}</p><hr>
    <p>Year: ${item.year}</p><hr>
    <p>Color: ${firstLetterToUpperCase(item.color)}</p>
    </figcaption>`
 
    addCardImage(item, 'mitsubishi', 'asx')
    addCardImage(item, 'mitsubishi', 'outlander')
    addCardImage(item, 'mitsubishi', 'eclipse')
    addCardImage(item, 'mitsubishi', 'pajero')
    addCardImage(item, 'toyota', 'rav-4')
    addCardImage(item, 'toyota', 'land cruiser')
    addCardImage(item, 'toyota', 'corolla')
    addCardImage(item, 'nissan', 'murano')
    addCardImage(item, 'nissan', 'terrano')
    addCardImage(item, 'nissan', 'qashqai')

    adsContainer.append(figure.cloneNode(true))
}

const trackScroll = () => {
    const scrolled = window.scrollY

    if (scrolled > 500) {
        scrollTopBtn.classList.add('active')
    }

    if (scrolled < 500) {
        scrollTopBtn.classList.remove('active')
    }
}

const scrollToTop = () => {
    if (window.scrollY > 0) {
        window.scrollTo({ 
            top: 0,
            behavior: 'smooth',
        })
    }
}

const createError = (node, text) => {
    const { name } = node
    const label = document.querySelector(`label[for=${name}]`)
    const span = document.querySelector(`span[data-error=${name}]`)
    const errorMessage = `${label.textContent} ${text}`
    span.innerText = errorMessage
    errorsContainer[name] = errorMessage

    if (node.classList.contains('success')) {
        node.classList.remove('success')
    }

    node.classList.add('error')
}

const deleteError = (nodeName) => {
    if (errorsContainer[nodeName]) {
        delete errorsContainer[nodeName]
        const span = document.querySelector(`span[data-error=${nodeName}]`)
        span.innerText = ""
    }
}

const checkEmail = (value) => {
    const regExp = /^\S+@\S+\.\S+$/

    return regExp.test(value)
}

const checkPassword = (value) => {
    const regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/

    return regExpPassword.test(value)
}

const clearForm = () => {
    for (let input of inputs) {
        if (input.type !== 'checkbox') {
            input.value = ''
            input.classList.remove('error', 'success')
            deleteError(input.name)
        }
    }
    termsCheckbox.checked = ''
}

function destructureForm(form) {
    const obj = {}
    const { elements } = form

    Array.from(elements)
        .filter((item) => !!item.name && item !== termsCheckbox)
        .map(item => {
            const { name, value } = item
            return obj[name] = value
        })
    return obj
}

async function sendFormData(data) {
    return await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
}

async function formSubmit() {
    const data = destructureForm(registerForm)
    const response = await sendFormData(data)
    return response
}

document.addEventListener('DOMContentLoaded', () => {
    carsData
    .then(data => resultBtn.innerHTML = `<span class='pointer-events-none'>View <b class = 'color-aqua'>${data.length}</b> ads</span>`)
    .catch(e => console.log(e.message))

    usersData
    .then(data => {
        if (data.length) {
            loginBtn.classList.remove('hidden')
            loginBtn.classList.add('active')
        }
    })
})

for (let input of inputs) {
    input.addEventListener('focus', () => {
        input.classList.remove('error')
        deleteError(input.name)
    })

    input.addEventListener('blur', event => {
        if (input.name !== 'pass') {
            input.value = input.value.trim()
        }

        if (input.name !== 'fname' && input.name !== 'lname' && input.name !== 'terms') {
            if (input.value.length <= 4) {
                createError(input, 'must contain at least 5 characters')
                return
            }

            if (input.value.includes(' ')) {
                createError(input, "can't contain spaces")
                return
            }

            if (input.name === 'email') {
                const isValid = checkEmail(event.target.value)
                if (!isValid) {
                    createError(input, 'has wrong format')
                    return
                }
            }

            if (input.name === 'pass') {
                const isValid = checkPassword(event.target.value)
                if (!isValid) {
                    alert('Your password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 symbol')
                    createError(input, 'has wrong format')
                    return
                }
            }
        }

        if (!event.target.value) {
            createError(input, 'is empty')
            return
        }

        if (errorsContainer[input.name]) {
            deleteError(input.name)
            input.classList.add('success')
        } else {
            input.classList.add('success')
        }
    })
}

clearBtn.addEventListener('click', event => {
    event.preventDefault()
    clearForm()
})

registerBtn.addEventListener('click', () => {
    body.classList.add('active-modal')
    modalContainer.classList.remove('hidden')
    modalContainer.classList.add('active-flex')
})

modalCloseBtn.addEventListener('click', () => {
    body.classList.remove('active-modal')
    modalContainer.classList.remove('active-flex')
    modalContainer.classList.add('hidden')
    clearForm()
})

registerForm.addEventListener('submit', event => {
    event.preventDefault()
    const checkLengthOfErrorsContainer = Object.entries(errorsContainer).length

    for (let input of inputs) {
        if (!input.value && input.type !== 'checkbox') {
            createError(input, 'is empty')
        }
    }

    if (termsCheckbox.checked) {
        if (!checkLengthOfErrorsContainer) {
            formSubmit()
            alert('Submitted!')
            alert('Thanks for registration!')
            modalContainer.classList.remove('active-flex')
            modalContainer.classList.add('hidden')
            loginBtn.classList.remove('hidden')
            loginBtn.classList.add('active')
            clearForm()
        } else {
            alert("Can't submit: you have some problems, please check red inputs")
        }
    } else {
        alert("Can't submit: you must accept the terms before submit")
        
        if (checkLengthOfErrorsContainer) { 
            alert('The rest of the fields are ok')
        } else {
            alert('And you have some other problems, please check red inputs')
        }
    }
})

makeBtn.addEventListener('click', event => {
    let count = 0
    
    if (makeList.children.length !== 0) {
        makeList.innerHTML = ''
    }

    btnDropdownBarsAppend('make', makeList)
    btnInnerTextChange(makeBtn, makeList, event)

    carsData.then(data => {
        for (let item of data) {
            if (makeBtn) {
                if (makeBtn.firstChild.textContent === item.make) {
                    ++count
                }
            }
        }

        if (modelBtn.firstChild.textContent !== modelBtnOriginTextContent) {
            count = temporaryCount
        }

        if (count !== 0) {
            resultBtn.innerHTML = `<span class='pointer-events-none'>View <b class = 'color-aqua'>${count}</b> ads</span>`
        } 

        if (count === 1) {
            resultBtn.innerHTML = `<span class='pointer-events-none'>View <b class = 'color-aqua'>${count}</b> ad</span>`
        }
    }).catch(e => console.log(e.message))
})

makeBtn.addEventListener('mouseover', event => {
    backgroundClrGreyClassAdd(makeBtn, event)
})

makeBtn.addEventListener('mouseout', event => {
    backgroundClrGreyClassRemove(makeBtn, event)
})

modelBtn.addEventListener('click', event => {
    const target = event.target
    const div = document.createElement('div')
    const modelMessage = document.querySelector('.model-message')

    if (modelList.children.length !== 0) {
        modelList.innerHTML = ''
    }

    if (target === modelBtn) {
        if (modelBtn.classList.contains('background-grey')) {
            if (!modelBtn.contains(modelMessage)) {
                div.classList.add('btn-alert-message', 'model-message')
                div.textContent = `Please ${btnGetInnerText(makeBtn)} first`
                modelBtn.append(div)
            }
        }
    }
    
    carsData.then(data => {
        let count = 0
        const modelsArray = []

        for (let item of data) {
            if (makeBtn.firstChild.textContent === item.make) {
                if (!modelsArray.includes(item.model)) {
                    modelsArray.push(item.model)
                }
            }
        }

        arrayAppendToList(modelsArray.sort(), modelList)
        btnInnerTextChange(modelBtn, modelList, event)

        for (let item of data) {
            if (modelBtn) {
                if (modelBtn.firstChild.textContent === item.model) {
                    ++count
                }
            }
        }

        if (!modelBtn.classList.contains('background-grey')) {
            if (count !== 0) {
                resultBtn.innerHTML = `<span class='pointer-events-none'>View <b class = 'color-aqua'>${count}</b> ads</span>`
            } 

            if (count === 1) {
                resultBtn.innerHTML = `<span class='pointer-events-none'>View <b class = 'color-aqua'>${count}</b> ad</span>`
            }
    
            if (yearBtn.firstChild.textContent !== yearBtnOriginTextContent) {
                resultBtn.innerHTML = `<span class='pointer-events-none'>View <b class = 'color-aqua'>${temporaryCount}</b> ads</span>`
            }
        }
    }).catch(e => console.log(e.message))
})

modelBtn.addEventListener('mouseover', event => {
    if (!modelBtn.classList.contains('background-grey')) {
        backgroundClrGreyClassAdd(modelBtn, event)
    }
})

modelBtn.addEventListener('mouseout', event => {
    if (!modelBtn.classList.contains('background-grey')) {
        backgroundClrGreyClassRemove(modelBtn, event)
    }
})

yearBtn.addEventListener('click', event => {
    const target = event.target
    const div = document.createElement('div')
    const yearMessage = document.querySelector('.year-message')

    if (yearList.children.length !== 0) {
        yearList.innerHTML = ''
    }

    if (target === yearBtn) {
        if (yearBtn.classList.contains('background-grey')) {
            if (!yearBtn.contains(yearMessage)) {
                div.classList.add('btn-alert-message', 'year-message')
                div.textContent = `Please ${btnGetInnerText(modelBtn)} first`
                yearBtn.append(div)
            }
        }
    }

    carsData.then(data => {
        let count = 0
        const yearsArray = []

        for (let item of data) {
            if (modelBtn.firstChild.textContent === item.model) {
                if (!yearsArray.includes(item.year)) {
                    yearsArray.push(item.year)
                }
            }
        }

        const sortedYearsArray = yearsArray.sort((a,b) => a - b)

        arrayAppendToList(sortedYearsArray, yearList)
        btnInnerTextChange(yearBtn, yearList, event)

        for (let item of data) {
            if (yearBtn) {
                if (makeBtn.firstChild.textContent === item.make && modelBtn.firstChild.textContent === item.model && +yearBtn.firstChild.textContent === item.year) {
                    count++
                }
            }
        }

        if (count !== 0) {
            resultBtn.innerHTML = `<span class='pointer-events-none'>View <b class = 'color-aqua'>${count}</b> ads</span>`
        } 

        if (count === 1) {
            resultBtn.innerHTML = `<span class='pointer-events-none'>View <b class = 'color-aqua'>${count}</b> ad</span>`
        }

        temporaryCount = count
    }).catch(e => console.log(e.message))
})

yearBtn.addEventListener('mouseover', event => {
    if (!yearBtn.classList.contains('background-grey')) {
        backgroundClrGreyClassAdd(yearBtn, event)
    }
})

yearBtn.addEventListener('mouseout', event => {
    if (!yearBtn.classList.contains('background-grey')) {
        backgroundClrGreyClassRemove(yearBtn, event)
    }
})

resetBtn.addEventListener('click', event => {
    event.preventDefault()
    const target = event.target
    
    if (target === resetBtn) {
        makeBtn.firstChild.textContent = makeBtnOriginTextContent
        modelBtn.firstChild.textContent = modelBtnOriginTextContent
        yearBtn.firstChild.textContent = yearBtnOriginTextContent
        modelBtn.classList.add('background-grey')
        yearBtn.classList.add('background-grey')
        resetBtn.classList.remove('active')
        makeList.classList.add('hidden')
        modelList.classList.add('hidden')
        yearList.classList.add('hidden')
        adsContainer.classList.remove('active-flex')
        adsContainer.innerHTML = ''
        state.maxScroll = 240
        state.count = 3
        state.previuosCount = 3
        
        carsData
        .then(data => resultBtn.innerHTML = `<span class='pointer-events-none'>View <b class = 'color-aqua'>${data.length}</b> ads</span>`)
        .catch(e => console.log(e.message))   
    }
})

resultBtn.addEventListener('click', event => {
    event.preventDefault()
    const target = event.target
    
    if (target === resultBtn) {
        adsContainer.classList.remove('active-flex')
        adsContainer.innerHTML = ''
        adsContainer.classList.add('active-flex')
    }

    if (temporaryIdsArray.length) {
        temporaryIdsArray = []
        state.maxScroll = 240
        state.count = 3
        state.previuosCount = 3
    }

    carsData.then(data => {
        for (let item of data) {
            if (makeBtn.firstChild.textContent === makeBtnOriginTextContent) {
                temporaryIdsArray.push(item.id)
            }

            if (makeBtn.firstChild.textContent !== makeBtnOriginTextContent) {
                if (makeBtn.firstChild.textContent === item.make && modelBtn.firstChild.textContent === modelBtnOriginTextContent) {
                    temporaryIdsArray.push(item.id)
                }

                if (makeBtn.firstChild.textContent === item.make && modelBtn.firstChild.textContent === item.model && yearBtn.firstChild.textContent === yearBtnOriginTextContent) {
                    temporaryIdsArray.push(item.id)
                }
            }

            if (makeBtn.firstChild.textContent === item.make && modelBtn.firstChild.textContent === item.model && +yearBtn.firstChild.textContent === item.year) {
                temporaryIdsArray.push(item.id)
            }
        }

        for (let item of data) {
            if (temporaryIdsArray.length < state.count) {
                for (let num of temporaryIdsArray.slice(0, state.count)) {
                    if (num === item.id) {
                        createCarCardAndAppendToAds(item)
                    }
                }
            }
            if (temporaryIdsArray.length >= state.count) {
                for (let num of temporaryIdsArray.slice(0, state.count)) {
                    if (num === item.id) {
                        createCarCardAndAppendToAds(item)
                    }
                }
            }
        }
        state.count += 3
    }).catch(e => console.log(e.message))
})

window.addEventListener('click', event => {
    const target = event.target
    const modelMessage = document.querySelector('.model-message')
    const yearMessage = document.querySelector('.year-message')

    removeBtnListClassActive(makeBtn, makeList, target)
    removeBtnListClassActive(modelBtn, modelList, target)
    removeBtnListClassActive(yearBtn, yearList, target)

    if (target === modalContainer) {
        body.classList.remove('active-modal')
        modalContainer.classList.remove('active-flex')
        modalContainer.classList.add('hidden')
        clearForm()
    }

    if (target !== modelBtn && target !== yearBtn) {
        if (modelBtn.contains(modelMessage)) {
            modelBtn.removeChild(modelMessage)
        }

        if (yearBtn.contains(yearMessage)) {
            yearBtn.removeChild(yearMessage)
        }
    }

    if (makeBtn.firstChild.textContent !== makeBtnOriginTextContent || target === resultBtn) {
        resetBtn.classList.add('active')
    }
})

window.addEventListener('scroll', () => {
    trackScroll()

    if (window.scrollY > state.maxScroll) {
        state.maxScroll += 400
        carsData.then(data => {
            for (let item of data) {
                if (temporaryIdsArray.length >= state.count) {
                    for (let num of temporaryIdsArray.slice(state.previuosCount, state.count)) {
                        if (num === item.id) {
                            createCarCardAndAppendToAds(item)
                        }
                    }
                }
            }
            state.previuosCount = state.count

            if (state.count < temporaryIdsArray.length) {
                state.count += 3
            }
            
            if (state.count >= temporaryIdsArray.length) {
                state.count = temporaryIdsArray.length
            }
        }).catch(e => e.message)
    }
})

scrollTopBtn.addEventListener('click', scrollToTop)


  