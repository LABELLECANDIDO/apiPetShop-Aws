import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 10 },  
        { duration: '2m', target: 50 },  
        { duration: '2m', target: 100 }, 
        { duration: '2m', target: 200 }, 
        { duration: '3m', target: 300 }, 
    ],
    thresholds: {
        'http_req_duration': ['p(95)<500'], // 95% das requisições abaixo de 500ms
        'checks': ['rate>0.95'],            // 95% das checagens devem ser bem-sucedidas
    },
};

export default function () {
    const res = http.get('http://localhost:3002/pets'); 

  itável
    check(res, { 
        'status 200': (r) => r.status === 200, 
        'response time < 500ms': (r) => r.timings.duration < 500 
    });

    sleep(1);
}
