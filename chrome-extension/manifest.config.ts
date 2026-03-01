import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

const IS_PROD = process.env.NODE_ENV === 'production'

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  icons: {
    48: 'public/logo.png'
  },
  action: {
    default_icon: {
      48: 'public/logo.png'
    },
    default_popup: 'src/popup/index.html'
  },
  permissions: ['sidePanel', 'identity', 'storage', 'cookies'],
  side_panel: {
    default_path: 'src/sidepanel/index.html'
  },
  host_permissions: [
    'https://*.hgo.one/*',
    IS_PROD ? '' : 'http://localhost:8080/*'
  ],
  key: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArwYJv7Jxbsa77/9x4nGvSWa3w/YNTpST8gM2ghbRsur8WMiHA3SzcPD1c4KttN1ojD12Er31jSvXpbU94dNQgqxIhBww0OPCPVabtP43Az/UPMtAEsIKCoJs3bKi3f+G3pDfXn6h+KuAv0KZ8Fk6mxMFWqUNgn9W7Cr67sObgHCzY44YnMRUU+7AX1qVd/nerSZEbLJmE6v0cBY+XzSLoK1RQMp1cNZXW4GKegyYMZp8SspfhNqkyogUGZCas44jo2G9c0CugyIrLEdP/qKcjYPJ9wMsyxQSZiW46aXepl5QV0A2LLzYub1dWHMVm58zRjESK7Oo4XtB5qzDTK+VNQIDAQAB'
})
