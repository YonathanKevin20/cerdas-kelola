export default defineAppConfig({
  ui: {
    primary: 'sky',
    gray: 'neutral',
    table: {
      default: {
        emptyState: {
          label: 'Tidak ada data',
        },
        loadingState: {
          label: 'Memuat data...',
        }
      }
    }
  },
  icon: {},
})
