import express, { Request , Response } from 'express';
import { Pool } from 'pg';
const app = express();
const port = 4000;

app.use(express.json());
const HOST = '0.0.0.0';

const dbPosgre = new Pool ({
    user: 'hqdb',         // ชื่อผู้ใช้ของ PostgreSQL
    host: `/cloudsql/serene-bazaar-454806-u7:us-central1:hqdb`,
    //host: '34.122.63.201',            // ที่อยู่ของเซิร์ฟเวอร์ PostgreSQL (ใช้ localhost หากเป็นเครื่องตัวเอง)
    database: 'hqdb',     // ชื่อฐานข้อมูล
    password: 'kGjPqTl3f!',     // รหัสผ่านของผู้ใช้
    port: 5432,                   // พอร์ตเริ่มต้นของ PostgreSQL คือ 5432
})


app.get('/querytest',async(req:Request,res:Response) => {
    const result = await dbPosgre.query(`SELECT * FROM public."Track"
LEFT JOIN public."InvoiceLine" on public."InvoiceLine"."TrackId" = public."Track"."TrackId"
LEFT JOIN public."Invoice" on public."Invoice"."InvoiceId" = public."InvoiceLine"."InvoiceId"
LEFT JOIN public."PlaylistTrack" on public."PlaylistTrack"."TrackId" = public."Track"."TrackId"
LEFT JOIN public."Playlist" on public."Playlist"."PlaylistId" = public."Playlist"."PlaylistId" limit 1000`);
    res.json(result.rows);
    console.log(result.rows.length)
})

app.listen(port,async() =>{
    console.log('Server Online');
    const result = await dbPosgre.query('SELECT NOW()');
    console.log(result);
})