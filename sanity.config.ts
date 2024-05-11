import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'cmsCBAT29',

  projectId: 'l9mtpnzh',
  dataset: 'production',
  token: 'sk7breXO8dwgBkC1ABK9YKrUU0J2u7hc3ujEKUzF5wuPHRoTjDt0TCr6e7EkbEp2U8AeEM7yAZsOZPlkJQyklKX72GrV8TZOeTAfryzgTcXVEZP6y6RF8KUar1vmJINuI1hMg6yVMxeh0bG3DXsopR0NRL67fF2k8PRfbosxPDfwvZz5N5gU',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
