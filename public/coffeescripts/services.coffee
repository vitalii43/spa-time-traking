(->
  angular
    .module("scotchApp")
    .service("Guid",->
      S4=-> (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      this.getGuid=-> (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
      this
    )
    .service("RandomDate",->
      this.getRandomDate=(start=new Date(2011, 0, 1), end=new Date()) -> new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      this
    )
    .service("Members",->
      this.getMembers=->
        arrMembers=[]
        for i in [0...localStorage.length]
          if localStorage.key(i).indexOf('member')!=-1
            arrMembers.push JSON.parse(localStorage.getItem(localStorage.key(i)))
        arrMembers
      this  
    )
    .service("DatesData",->
      this.getDatesData=(member,months)->
        months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

        countWorking=(0 for [0..11])
        if JSON.parse(member) && JSON.parse(member).working
          workingArr=JSON.parse(member).working
          workingDay=(new Date(item) for item in workingArr)
          arr=(months[item.getMonth()] for item in workingDay)
          workingMonth= arr.filter((elem, index, self)-> index == self.indexOf(elem))
          countWorking[item.getMonth()]++ for item in workingDay

        countNotWorking=(0 for [0..11])
        if JSON.parse(member)&&JSON.parse(member).notworking
          notworkingArr=JSON.parse(member).notworking
          notworkingDay=(new Date(item) for item in notworkingArr)
          arr=(months[item.getMonth()] for item in notworkingDay)
          notworkingMonth= arr.filter((elem, index, self)-> index == self.indexOf(elem))
          countNotWorking[item.getMonth()]++ for item in notworkingDay

        {"working":countWorking,"notWorking":countNotWorking}
      this  
    )
)()