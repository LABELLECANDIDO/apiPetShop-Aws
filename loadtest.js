import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 10 },
        { duration: '2m', target: 50 },
        { duration: '2m', target: 100 },
        { duration: '1m', target: 0 },
    ],
    thresholds: {
        'http_req_duration': ['p(95)<500'], // 95% das requisições devem estar abaixo de 500ms
    },
};

export default function () {
    const res = http.get('http://localhost:3002/pets');
    check(res, { 'status 200': (r) => r.status === 200 });
    sleep(1);
}
