import { Injectable } from '@angular/core';

export class Config {
    ts_ip: string;
    api_url: string;
}

export const config: Config = {
    ts_ip: 'tba.synmatter.com',
    api_url: 'http://localhost:3366'
}

