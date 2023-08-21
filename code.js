let filinp = document.querySelector('.filinp')
    // let textinpus = document.querySelector('.textinpus')
let btn = document.querySelector('.btg')
let ainoiaii = document.querySelector('.ainoiaii')
    // 
let aidnfodaid = document.querySelector('.aidnfodaid')
let aidnfodaidfdoi = document.querySelector('.aidnfodaidfdoi')

let adnfoaddd = document.querySelector('.adnfoaddd')

let fileaidnfdoa = document.querySelector('.fileaidnfdoa')

let down = document.querySelectorAll('.down')

let file = []
let result = []
let url = ''

let sub = false

filinp.addEventListener('change', (e) => {
    let fl = e.target.files;

    if (fl.length > 0) {
        url = ''
        for (var i = 0; i < fl.length; i++) {
            let fil = {
                file: fl[i],
                type: fl[i].type.split('/')[0],
                id: Math.random().toString().split('.').join(''),
                maint: fl[i].type
            }
            file.push(fil)
        }
    }
});

// textinpus.addEventListener('change', (e) => {
//     if (file.length > 0) {
//         file = []
//     }
//     url = e.target.value
// })

function URLS() {

}

function ADDIMAGE(val) {
    let html =
        `
        <div class="aidnfoad h-[200px] w-full overflow-auto">
            ${val.type.includes('image') ? `<img src='${window.location.origin}/${val.file}/?type=${val.type}' alt="">` : val.type.includes('video') ? `<iframe style="width: 100%; height: 100%;" frameborder="none" src='${window.location.origin}/${val.file}/?type=${val.type}'></iframe>` : `<iframe style="width: 100%; height: 100%;" frameborder="none" src='${window.location.origin}/${val.file}/?type=${val.type}'></iframe>`}
        </div>

        `

    fileaidnfdoa.innerHTML += html
}

//

function GT(e) {
    console.log(e)
}

// 

function FILE() {
    sub = true
        // 
    btn.innerHTML = `<span class="loading"></span>`
    btn.disabled = true
        // 
    let count = 0
    file.map((val, index) => {
        setTimeout(() => {
            // // 
            let formData = new FormData()
            formData.append('file', val.file);
            // 
            axios.post(`http://192.168.1.43:3001/api/${val.type}/data/${val.id}`, formData).then(res => {
                let fil = {
                    file: res.data.path,
                    type: val.maint,
                    id: val.id
                }
                ADDIMAGE(fil)
                sub = false

                count = count + 1
                if (count === file.length) {
                    // 
                    btn.innerHTML = `Upload`
                    btn.classList.remove('loading')
                    btn.disabled = false
                        // 
                }

            }).catch(er => {
                sub = false
                    // 
                btn.innerHTML = `Upload`
                btn.classList.remove('loading')
                btn.disabled = false
                    // 
                alert(`Something went wrong.`)
            })
        }, index * 2000);
    })
}

ainoiaii.addEventListener('click', () => {
    aidnfodaidfdoi.style.transition = `all .2s ease-in-out`
    aidnfodaidfdoi.style.bottom = `0%`
})

btn.addEventListener('click', () => {
    if (sub === false) {
        if (url.trim().length > 0) {
            URLS()
        } else if (file.length > 0) {
            FILE()
        } else {
            alert(`Invalid URL / Empty File (Invalid File).`)
        }
    }
})

aidnfodaid.addEventListener('mousedown', (e) => {
        // 
        aidnfodaidfdoi.style.transition = `none`
            // 
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUP)
        document.addEventListener('mouseleave', mouseUP)

        function mouseMove(es) {
            let y = es.clientY;
            let yt = Math.max(0, y)
            aidnfodaidfdoi.style.bottom = `${-yt}px`
                // 
            adnfoaddd.style.scale = `${Math.min(1, y / 100)}`;
        }

        function mouseUP(es) {
            aidnfodaidfdoi.style.transition = `all .2s ease-in-out`
            document.body.style.cursor = `default`
            document.removeEventListener('mousemove', mouseMove)
            document.removeEventListener('mouseup', mouseUP)
            document.removeEventListener('mouseleave', mouseUP)

            let video = document.querySelectorAll('video')
            let audio = document.querySelectorAll('audio')

            if (video.length > 0) { 
                video.forEach(v => { 
                    v.pause()
                })
            }
            else {}

            if (audio.length > 0) { 
                 audio.forEach(v => { 
                    v.pause()
                })
            }
            else {}
                // 
            let y = es.clientY
            if (y < 300) {
                aidnfodaidfdoi.style.bottom = `0%`
            } else {
                aidnfodaidfdoi.style.bottom = `${-110}%`
            }
        }
    })
    // 
    // 
aidnfodaid.addEventListener('touchstart', (e) => {
    // 
    aidnfodaidfdoi.style.transition = `none`
        // 
    document.addEventListener('touchmove', mouseMove)
    document.addEventListener('touchcancel', mouseUP)
    document.addEventListener('touchend', mouseUP)

    function mouseMove(es) {
        let y = es.touches[0].clientY;
        let yt = Math.max(0, y)
        aidnfodaidfdoi.style.bottom = `${-yt}px`
            // 
        adnfoaddd.style.scale = `${Math.min(1, y / 100)}`
    }

    function mouseUP(es) {
        aidnfodaidfdoi.style.transition = `all .2s ease-in-out`
        document.body.style.cursor = `default`
        document.removeEventListener('touchmove', mouseMove)
        document.removeEventListener('touchend', mouseUP)
        document.removeEventListener('touchcancel', mouseUP)
            // 
        let y = es.changedTouches[0].clientY
        if (y < 300) {
            aidnfodaidfdoi.style.bottom = `0%`
        } else {
            aidnfodaidfdoi.style.bottom = `${-110}%`
        }
    }
})

axios.get(`http://192.168.1.43:3001/api/data`).then(res => {
    res.data.map((val) => {
        ADDIMAGE(val)
    })
}).catch(er => {console.table([{message: `Unable to get Files.`, error: er}])})