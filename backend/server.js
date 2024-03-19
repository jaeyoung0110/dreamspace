// express 기본 문법
const express = require('express');
const cors = require('cors');
const app = express();
// 요청.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// mongoDB 기본 문법
const {MongoClient} = require('mongodb');
const password = encodeURIComponent('jojy0110@!!');

app.use(cors());

let DB;
const url = `mongodb+srv://whwodud231:${password}@cluster0.gtdkolx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
new MongoClient(url)
    .connect()
    .then((client) => {
        console.log('DB 연결성공');
        DB = client.db('dreamspace');
        // 서버 시작 코드
        app.listen(8080, () => {
            console.log('http://localhost:8080 에서 서버 실행중');
        });
    })
    .catch((err) => {
        console.log('DB 연결실패 : ', err);
    });

app.get('/edujournals', async (요청, 응답) => {
    console.log('eduJournal 요청 받음');
    let eduJournals = await DB.collection('post')
        .find({eduJournal: {$exists: true}})
        .toArray();
    // 응답.send(eduJournals);
    응답.send(
        eduJournals.map((data) => {
            return data.eduJournal;
        })
    );
});

app.get('/classes', async (요청, 응답) => {
    console.log('classes 요청 받음');
    const classes = await DB.collection('post')
        .find({classes: {$exists: true}})
        .toArray();
    응답.send(classes[0].classes);
});

app.get('/teachers', async (요청, 응답) => {
    console.log('teachers 요청 받음');
    const teachers = await DB.collection('post')
        .find({teachers: {$exists: true}})
        .toArray();
    응답.send(teachers[0].teachers);
});

app.post('/journal', async (요청, 응답) => {
    console.log('SUCCESS! POST:journal');
    console.log(요청.body);
    const journal = 요청.body;
    function formatDate() {
        const formattedDate = {};
        const date = journal.date.split(' ');
        date.forEach((data, i) => {
            if (i == 3) {
                date[i] = date[i].slice(0, -1);
            }
            date[i] = date[i].slice(0, -1);
        });
        formattedDate.year = date[0];
        formattedDate.month = date[1];
        formattedDate.date = date[2];
        formattedDate.day = date[3];
        return formattedDate;
    }
    function formatMain() {
        const main = [];
        journal.main_period.forEach((data, i) => {
            main.push({
                period: Number(data.slice(0, -2)),
                class: journal.main_class[i],
                time: journal.main_time[i].substring(0, 5),
                content: journal.main_content[i],
            });
        });
        return main;
    }
    const formattedDate = formatDate();
    const formattedName = journal.name_subject.split('_')[0];
    const formattedSubject = journal.name_subject.split('_')[1];
    const formattedMain = formatMain();

    await DB.collection('post').insertOne({
        eduJournal: {
            date: formattedDate,
            name: formattedName,
            subject: formattedSubject,
            punchIn: journal.punchIn,
            punchOut: journal.punchOut,
            main: formattedMain,
            details: journal.details,
        },
    });
});
