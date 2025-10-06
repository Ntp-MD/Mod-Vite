<template>
    <div class="talent-desc">
        <p id="desc-title">{{pData.name}}</p>
        <p id="talent-level">Current talent level: {{pData.cur_level}}</p>
        <ol class="require-list">
            <li :style="{color: (pData.unlocked || pData.points==1) ? '#00ff00' : 'red'}">Talent category known</li>
            <li v-if="!this.pData.no_levelup_category_deps && pData.index!=0 && pData.points==5" :style="{color: pData.category_dep ? '#00ff00' : 'red'}">Lower talents of the same category: {{pData.index}}</li>
            <li v-if="statReq!=''">{{statReq}}</li>
            <li>Level: {{levelStr}}</li>
            <li v-if="otherReq!=''">{{otherReq}}</li>
        </ol>
        <p style="color:#00ff00" id="effect-level"><span class="c1">Effect talent level:</span> {{effectLevelStr}}</p>
        <p style="color:#00ff00"><span class="c1">Use mode: </span>{{useModeStr}}</p>
        <p style="color:#00ff00" v-for="c of costs" :key="c.desc"><span class="c1">{{c.desc}} </span>{{c.value}} </p>
        <!-- <p style="color:#00ff00" v-if="this.pData.cost"><span class="c1" >{{resource_str}}</span>{{cost_str}}</p> -->
        <p v-if="this.pData.range"><span class="c1">Range: </span>{{rangeStr}}</p>
        <p v-if="this.pData.cooldown"><span class="c1">Cooldown: </span>{{cdStr}}</p>
        <p v-if="this.pData.proj_speed"><span class="c1">Travel Speed: </span>{{travelSpeedStr}}</p>
        <p v-if="this.pData.use_speed"><span class="c1">Use Speed: </span>{{useSpeedStr}}</p>
        <p v-if="isStr!=''"><span class="c1" >Is: </span>{{isStr}}</p>
        <p class="c1" id="desc-head">Description:</p>
        <div v-html="infoStr"></div>

    </div>    
</template>
  
  <script>
  
  import { Const } from "../const.js"
  
  export default {
    name: 'TalentDesc',
    props: {
      pData: Object
    },

    computed: {
        effectLevelStr(){
            if (this.pData.points == Const.TALENT_LEVEL_MAX) {
                let arr = []
                for (let i=0; i<Const.TALENT_LEVEE_MAX; i++) {
                    arr.push( ((i+1)*parseFloat(this.pData.mastery)).toFixed(1) )
                }
                return arr.join(" ")
            } else {
                return "1"
            }
        },

        levelStr (){
            if(this.pData.require) {
                let t = []
                for (let r of this.pData.require) {
                    t.push(r.split(",")[0].split(" ")[1])
                }
                return t.join(", ")
            } else {
                return "0, 1, 2, 3, 4"
            }
        },

        statReq() {
            if (this.pData.require) {
                let tmp = this.pData.require[0].split(", ")
                if (tmp.length == 1) {
                    return ""
                } else {
                    let stat = tmp[1].split(" ")[0]
                    let t = []
                    for (let r of this.pData.require) {
                        let s = r.split(", ")[1].split(" ")[1]
                        if (s.trim().endsWith(';')) {
                            s = s.trim().slice(0,-1)
                        }
                        t.push(s)
                    }
                    return stat + " " + t.join(", ")
                }
            } else {
                return ""
            }
        }, 

        otherReq() {
            if (this.pData.require) {
                let tmp = this.pData.require[0].split("; ")
                if (tmp.length == 1) {
                    return ""
                } else {
                    return tmp[1]
                }
            } else {
                return ""
            }
        },

        useModeStr() {
            if (this.pData.mode) {
                return this.capFirst(this.pData.mode)
            } else {
                return "Activated"
            }
        },

        rangeStr() {
            return this.parseData(this.pData.range)
        },

        cdStr() {
            return this.parseData(this.pData.cooldown)
            
        },

        travelSpeedStr() {
            let a = parseFloat(this.pData.proj_speed) * 100
            return a.toString() + "% of base"
        },

        useSpeedStr() {
            return this.pData.use_speed
        },

        costs() {
            let ret = []
            for (let r in Const.RESOURCE_TYPES) {
                if (this.pData[r] || this.pData["sustain_"+r] ){
                    let value = this.pData[r] ? this.pData[r] : this.pData["sustain_"+r]
                    let obj = {}
                    obj["value"] = Math.abs(value)
                    let str =""
                    str = Const.RESOURCE_TYPES[r]
                    if (this.pData.mode == Const.USE_MODE_SUSTAIN) {
                        str = "sustain " + str
                    } 
                    if (value > 0) {
                        str += " cost: "
                    } else {
                        str += " gain: "
                    }
                    obj["desc"] = this.capFirst(str)
                    ret.push(obj)
                }
            }
            return ret
        },

        isStr() {
            let ret=""
            let pairs = {
                is_antimagic : "an antimagic ability",
                is_mind : "an mind power",
                is_nature : "an nature gift",
                is_spell : "an spell"
            }
            let out= []
            for (let k in pairs) {
                if (this.pData[k]) {
                    out.push(pairs[k])
                }
            }
            if (out.length == 1) {
                ret = out[0]
            }else if(out.length > 1) {
                let last = out.pop()
                ret = out.join(", ")
                ret = ret + " and " + last
            }
            return ret
        },

        infoStr() {
            if(this.pData.info_text) {
                return "<p style=\"margin-top: 0px;\"" + this.pData.info_text.slice(2)
            } else {
                return ""
            }
        }
    },
  
    methods: {
        parseData(str) {
            if (typeof(str)=="string" && str.startsWith("<")) {
                let tmp = str.slice(1,-1).split(">")
                let tmp2 = tmp[tmp.length-1].split("<")[0]
                return tmp2
            } else {
                return str
            }
        },

        capFirst(str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

    #desc-title {
        color:#ffd800;
        margin-bottom:3%;
    }

    #desc-head {
        margin-top:10px;
    }
    
    .talent-desc {
        text-align: left;
    }

    .info {
        margin-top:0px;
    }
    
    .c1 {
        color: #4ce675;
    }
    
    .require-list {
        list-style:square;
        margin-top: 0%;
        margin-bottom: 0%;
        padding-inline-start: 10px;
    }
    
    p {
        margin-top: 0%;
        margin-bottom: 0%;
    }

    li {
        color: #00FF00;
        margin-inline-start: 10px; 
    }

  </style>
  