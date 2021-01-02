import {VuexModule, Module, Mutation, Action} from "vuex-class-modules";
import axios from '@/plugins/axios'
@Module({generateMutationSetters: true})
class CoreModule extends VuexModule {
    //state
    private token: string | null = null;
    public Hi:String | null = null;


    async getHttp(url:string):Promise<any>{
        return  await axios.get(url).then((r)=>{return r.data}).catch((e)=>{return e.response.data})
    }

    async postHttp(url:string,form:object):Promise<any>{
        return  await axios.post(url,form).then((r)=>{return r.data}).catch((e)=>{return e.response.data})
    }

    async putHttp(url:string,form:object):Promise<any>{
        return  await axios.put(url,form).then((r)=>{return r.data}).catch((e)=>{return e.response.data})
    }

    async deleteHttp(url:string):Promise<any>{
        return  await axios.delete(url).then((r)=>{return r.data}).catch((e)=>{return e.response.data})
    }

  
    async getBase64(file:any) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

}

import store from "@/store"
export const Core = new CoreModule({store, name: "Core"})
