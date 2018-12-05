game.import("extension",function(lib,game,ui,get,ai,_status){return {name:"baosanniang",editable:false,content:function (config,pack){
    
},precontent:function (){
    
},help:{},config:{},package:{
    character:{
        character:{
            "bsn_baosanniang":["female","shu",3,["bsn_wuniang","bsn_xushen"],["des:有关妹子的介绍资料详看百度"]],
        },
        translate:{
            "bsn_baosanniang":"鲍三娘",
        },
    },
    card:{
        card:{
        },
        translate:{
        },
        list:[],
    },
    skill:{
        skill:{
            "bsn_wuniang":{
                audio:"ext:鲍三娘:2",
                trigger:{
                    player:["useCard","respond"],
                },
                direct:true,
                priority:2018,
                filter:function (event,player){
        return event.card&&event.card.name=='sha'&&event.notLink();
    },
                content:function (){
        "step 0"
        var check;
        var i,num=game.countPlayer(function(current){
            return current!=player&&current.countCards('he')>0;
        });
        check=(num>=2);
        player.chooseTarget(get.prompt('bsn_wuniang'),1,function(card,player,target){
            return target.countCards('he')>0&&player!=target;
        },function(target){
            if(!_status.event.aicheck) return 0;
            var att=get.attitude(_status.event.player,target);
            if(target.hasSkill('tuntian')) return att/10;
            return 1-att;
        }).set('aicheck',check);
        "step 1"
        if(result.bool){
            var target=result.targets[0];   
            player.logSkill('bsn_wuniang',target);
            player.gainPlayerCard(target,'he',true);
            target.draw();       
        }
        else{
            event.finish();
        }
     "step 2"  
   //written by Sukincen
   for(var i=0;i<game.players.length;i++){
            if(game.players[i].name=='guansuo'){
                player.chooseBool('是否令关索摸一张牌？').set('ai',function(){                    
                     return get.attitude(player,game.players[i]);     
                    });           
            }
            }
            "step 3"
            if(result.bool){
            for(var i=0;i<game.players.length;i++){
            if(game.players[i].name=='guansuo'){
                game.players[i].draw();    
            }
            }
            }            
       else{
           event.finish();
       }
    },
                ai:{
                    threaten:2,
                    expose:0.3,
                },
            },
            "bsn_xushen":{
                trigger:{
                    player:"recoverAfter",
                },
                logTarget:"source",
                audio:"ext:鲍三娘:2",
                direct:true,
                derivation:["bsn_zhengnan"],
                filter:function (event,player){           
                for(var i=0;i<game.players.length;i++){
            if(game.players[i].name=='guansuo') return false;           
            }        
        return player.hp==1&&event.source&&event.source!=player&&event.source.sex=='male';        
    },
                content:function (){
        'step 0'                               
        trigger.source.chooseBool('你是否愿意娶鲍三娘为妻？').set('ai',function(){                    
                    if(trigger.source.isAlive()) return true;     
                    });
       'step 1'
        if(result.bool){
        player.$fullscreenpop('有情人终成眷属','fire'); 
        game.delay(0.8);
        var name1=trigger.source.name;
        var name2='guansuo';        
        trigger.source.reinit(name1,name2,false);
        if(trigger.source.identity=='zhu'){
        trigger.source.maxHp=5;
        }
        else{
        trigger.source.maxHp=4;
        }
        trigger.source.update();
        player.logSkill('bsn_xushen');  
            player.removeSkill('bsn_xushen');          
            player.recover();
            player.addSkill('bsn_zhengnan');
            player.update();
        }    
        else{
            event.finish();
        }        
    },
            },
            "bsn_zhengnan":{
                audio:"ext:鲍三娘:2",
                trigger:{
                    global:"useCard",
                },
                filter:function (event,player){
        return event.player!=player&&event.card&&event.card.name=='nanman'&&event.notLink();
    },
                direct:true,
                content:function (){
        "step 0";
        player.chooseTarget('选择【镇南】的目标',lib.translate.bsn_zhengnan_info,true,function(card,player,target){
            return target!=player;
        }).set('ai',function(target){
            return -get.attitude(_status.event.player,target);            
        });        
        "step 1"
        if(result.bool){
            player.logSkill('bsn_zhengnan');
            var target=result.targets[0];                     
            target.damage([1,2,3].randomGet());            
        }
    },
            },
        },
        translate:{
            "bsn_wuniang":"武娘",
            "bsn_wuniang_info":"你使用或打出【杀】时，你可以获得一名其他角色的一张牌，然后该角色摸一张牌；若“关索”在场，你可令“关索”也摸一张牌",
            "bsn_xushen":"许身",
            "bsn_xushen_info":"当其他男性角色令你脱离濒死状态时，若“关索”不在场，其可以选择是否用“关索”替换其武将牌，然后你回复一点体力并获得技能【镇南】",
            "bsn_zhengnan":"镇南",
            "bsn_zhengnan_info":"当你成为【南蛮入侵】的目标时，你可令一名其他角色随机受到一至三点伤害",
        },
    },
    intro:"",
    author:"小苏&Sukincen",
    diskURL:"",
    forumURL:"",
    version:"2.0",
},files:{"character":["bsn_baosanniang.jpg"],"card":[],"skill":[]}}})