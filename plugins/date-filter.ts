import Vue from 'vue'
import moment from 'moment'

export default Vue.filter('formatDate', (value: any) => {
    if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
    }
});