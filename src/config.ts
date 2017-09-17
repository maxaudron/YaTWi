import { Injectable } from '@angular/core';

export class Config {
    ts_ip: string;
    ts_sid: string;
    api_url: string;
}

export const config: Config = {
    ts_ip: 'tba.synmatter.com', // TeamSpeak Server IP Address
    ts_sid: '2', // TeamSpeak Server ID for Standart VServer to be selected
    api_url: 'http://tba.synmatter.com' // URL that points to the API
}

