require('dotenv').config();
const mysql = require('mysql2/promise');

const { DB_USER, DB_PASSWORD } = process.env;

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: DB_USER,
    password: DB_PASSWORD,
    database: 'celestial_league',
    connectionLimit: 10
});

(async () => {
    try {
      // 단순 조회 예시
      const [rows] = await pool.query('SELECT * FROM celestial_user');
      console.log('celestial_user 테이블 조회 결과:', rows);
  
      // 실행 후 종료 (테스트용)
      await pool.end();
    } catch (err) {
      console.error('DB 쿼리 에러:', err);
    }
})();
