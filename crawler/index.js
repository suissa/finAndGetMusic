const fs = require(`fs`)
const rp = require(`request-promise`)
const PATH = __dirname + '/musics'
const find = process.argv.filter(el => !el.includes('/')).join('+')
const page = `&page=0`
const BASE = `http://slider.kz`
const uri = `${BASE}/new/include/vk_auth.php?act=source1&q=${find}`

const events = require('events')
const eventEmitter = new events.EventEmitter()

// const downloadedArr = []

// const downloaded = (music) => {
    
// }

// eventEmitter.on('downloaded', downloaded);  

const ensureExists = (path, mask, cb) => {
    if (typeof mask == 'function') {
        cb = mask
        mask = 0777
    }
    fs.mkdir(path, mask, (err) =>
        ( err ) 
            ? (err.code == 'EEXIST') ? cb(null) : cb(err)
            : cb(null))
}

var getLinks = {
    uri,
    headers: {
        'Content-Type': `application/json`
    },
    json: true
}

console.time('tempo para receber a resposta')
console.log(`\n\n\n\t\t INICIANDO A BUSCA PARA: ${find} `)

rp(getLinks)
    .then(function(response) {
        console.timeEnd('tempo para receber a resposta')
        if ( ! response.trim().length ) return console.log('Não achou essa busca!')

        const list = JSON.parse(response.trim())

        console.log(`\n\t\t recebi a lista de ${list.feed.length} mp3s ... `)
        console.log(`\n\t\t MAS BAIXAREI APENAS 2 PARA TESTAR `)
        // console.log(`\n\t\t agora salvarei no banco ... `)
        console.log(`\n\t\t enquanto baixo TODAS ELAS ... `)

        const listToSave = list.feed.map( el => el.entry )

        console.time('tempo para baixar TODAS as musicas')

        const musics = listToSave.slice(-2).map( el => 
            ensureExists( __dirname + '/' + el.tit_art, 0744, 
                (err) => err 
                                ? console.log('Nao rolou criar as pastas aqui', err)
                                : rp.get(`${BASE}${el.url}`)
                                    .on(`response`, res => console.log(`\n\t\t baixando ${el.tit_art} ... `))
                                    .on(`error`, (err) =>
                                        console.log(`MERDA AO BAIXAR DE: ${BASE}${el.url} \n`, el.tit_art))
                                    .pipe(fs.createWriteStream(PATH+'/'+el.tit_art+'/'+el.tit_art+'.mp3'))
                                    .on( `finish`, () => {
                                        console.log(`\t\t\t Baixada: ${el.tit_art}.mp3`)
                                        // console.timeEnd('tempo para baixar TODAS as musicas')
                                        // process.exit(1) 
                                    })
            )
        )
        // const downloaded = musics.map( ( music, i )=> 
        //     music
        //         .on(`response`, res => console.log(`\n\t\t baixando ${list[i].el.tit_art} ... `))
        //         .on(`error`, (err) =>
        //             console.log(`MERDA AO BAIXAR DE: ${BASE}${list[i].el.url} \n`, el.tit_art))
        //         .pipe(fs.createWriteStream(__dirname+'/'+list[i].el.tit_art+'/'+list[i].el.tit_art+'.mp3'))
        //         .on( `finish`, () => {
        //             console.log(`\t\t\t Baixada: ${list[i].el.tit_art}.mp3`)
        //         })
        // )
        console.log('musics', musics)
        // console.timeEnd('tempo para baixar TODAS as musicas')
        // process.exit(1) 
        return listToSave
    })
    .then( body => {
        // console.log(`\n\n\n\t\t SALVEI A PORRA TODA NO BANCO`, body)

    })
    .catch( err => {
        // API call failed... 
        console.log(`err`, err)
    })
    .finally( () => {
        // API call failed... 
        console.log(`Por hoje eh soh pesoal!`)
    })