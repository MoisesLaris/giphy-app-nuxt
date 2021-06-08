import Vue from 'vue'
import moment from 'moment'

export default Vue.filter('formatDate', (value: any) => {
    if (value) {
        console.log(value)
        return moment(String(value), "YYYY-MM-DD hh:mm:ss").format('DD/MM/YYYY')
    }
});