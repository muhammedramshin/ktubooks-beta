import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  expencetypes: any;
  totalExpence: number = 0;
  totalIncome: number = 0;

  constructor(private afs: AngularFirestore) { }

  monthList = [
    { id: 0, name: 'January' },
    { id: 1, name: 'February' },
    { id: 2, name: 'March' },
    { id: 3, name: 'April' },
    { id: 4, name: 'May' },
    { id: 5, name: 'June' },
    { id: 6, name: 'July' },
    { id: 7, name: 'August' },
    { id: 8, name: 'September' },
    { id: 9, name: 'October' },
    { id: 10, name: 'November' },
    { id: 11, name: 'December' },
  ];

  yearList = [
    { id: 2023, name: '2023' },
    { id: 2024, name: '2024' },
  ];


 
 
// piechart for expence type 
expencetypePieChart: any = [];
options = {
  colors: [ '#FF4136',  '#2ECC40',  '#0074D9',  '#FF851B',  '#B10DC9',  '#FFDC00',  '#F012BE',  '#39CCCC',  '#01FF70',  '#85144b',  '#7FDBFF',  '#3D9970'], is3D: false
};

expenceCategoryPieChart: any = {
  chartType: 'PieChart',
};


  // month expense and income chart
  linetype: any = 'LineChart';
  chartData = {
    columnNames: ["DAY", "INCOME", "EXPENCE"],
    options: {
      hAxis: {
        title: 'DAY'
      },
      vAxis: {
        title: 'AMOUNT'
      },
    },
    width: 300,
    height: 300
  };
  monthlineChartData: any = [];
  allTransactions: any;
  monthData: any;
  selectedYear: any;
  selectedMonth: any;
  ngOnInit(): void {
    this.getTransaction();
    this.getExpTypes();
    // get current year
    this.selectedYear = new Date().getFullYear();
    // get current month
    this.selectedMonth = new Date().getMonth();
  }

  getTransaction() {
    //  get customers where is_active is true
    this.afs.collection('moneytransactions', (ref: any) => ref.orderBy('createdAt', 'desc')).valueChanges({ idField: 'id' }).subscribe((res: any) => {
      console.log(res);
      let month= new Date().getMonth();
      this.getMonthDataOfInOut(month, res);
      this.allTransactions = res;
    },
      (err: any) => {
        console.log(err);
      }
    );
  }

  filterMonthLineChart() {
    this.getMonthDataOfInOut(this.selectedMonth, this.allTransactions);
    this.getExpeneOfTheMonth(this.selectedMonth, this.allTransactions);
  }


  getMonthDataOfInOut(month: any, data: any) {
    this.totalIncome=0;
    this.totalExpence=0;
    let monthTransactions: any = [];
    data.forEach((item: any) => {
      // extract date from firestore timestamp without time
      let itemDate = new Date(item?.date?.toDate().getFullYear(), item?.date?.toDate().getMonth(), item?.date?.toDate().getDate());
      if (itemDate.getMonth() == month) {
        if (item.type == 'INCOME' || item.type == 'EXPENCE') {
          monthTransactions.push(item);
        }
      }
    }
    );
    //group same day transaction
    let monthGroupedTranaction: any = [];
    monthTransactions.forEach((item: any) => {
      let itemDate = new Date(item?.date?.toDate().getFullYear(), item?.date?.toDate().getMonth(), item?.date?.toDate().getDate());
      let index = monthGroupedTranaction.findIndex((x: any) => x.date == itemDate.getDate());
      if (index == -1) {
        monthGroupedTranaction.push({ date: itemDate.getDate(), data: [item] });
      } else {
        monthGroupedTranaction[index].data.push(item);
      }
    }
    );
    console.log(monthGroupedTranaction);
    //calculate total income and expence
    monthGroupedTranaction.forEach((item: any) => {
      let income = 0;
      let expence = 0;
      item.data.forEach((item1: any) => {
        if (item1.type == 'INCOME') {
          income += item1.amount;
          this.totalIncome += item1.amount;
        } else if (item1.type == 'EXPENCE') {
          expence += item1.amount;
          this.totalExpence += item1.amount;
        }
      });
      item.income = income;
      item.expence = expence;
    }
    );
    console.log(monthGroupedTranaction);
    //insert data in chart
    this.monthlineChartData.data = [];
    // this.monthlineChartData.data.push(['Date', 'Income', 'Expence']);
    monthGroupedTranaction.forEach((item: any) => {
      this.monthlineChartData.data.push([item.date, parseInt(item.income), parseInt(item.expence)]);
    });
    console.log(this.monthlineChartData.data);
    //get the highiest income and expence
    let maxIncome = 0;
    let maxExpence = 0;
    monthGroupedTranaction.forEach((item: any) => {
      if (item.income > maxIncome) {
        maxIncome = item.income;
      }
      if (item.expence > maxExpence) {
        maxExpence = item.expence;
      }
    });
    console.log(maxIncome, maxExpence);
    // this.width = maxIncome + 100;
    // this.height = maxExpence + 100;
    
    console.log('check Point', this.monthlineChartData.data);
  }


  getExpTypes() {
    //  get customers where is_active is true
    this.afs.collection('expencetypes').valueChanges({ idField: 'id' }).subscribe((res: any) => {
      console.log(res);
      this.expencetypes = res;
      this.getExpeneOfTheMonth(this.selectedMonth, this.allTransactions);
    })
    console.log(this.expencetypes);
  }

  getExpeneOfTheMonth(month: any, data: any) {
    let monthTransactions: any = [];
    data.forEach((item: any) => {
      // extract date from firestore timestamp without time
      let itemDate = new Date(item?.date?.toDate().getFullYear(), item?.date?.toDate().getMonth(), item?.date?.toDate().getDate());
      if (itemDate.getMonth() == month) {
        if (item.type == 'INCOME' || item.type == 'EXPENCE') {
          monthTransactions.push(item);
        }
      }
    }
    );
    console.log('check Point month transactions', monthTransactions);
    //filter expence as action- in and type - expence
    let monthExpence: any = [];
    monthTransactions.forEach((item: any) => {
      if (item.type == 'EXPENCE' && item.action == 'OUT') {
        monthExpence.push(item);
      }
    }
    );
    console.log('check Point expence', monthExpence);
    //geroup by expence type and calculate total amount
    let total=0;
    let monthGroupedTranaction: any = [];
    monthExpence.forEach((item: any) => {
      let index = monthGroupedTranaction.findIndex((x: any) => x.type == item.expenceof);
      if (index == -1) {
        monthGroupedTranaction.push({ type: item.expenceof, data: [item], total: item.amount });
        total+=item.amount;
      } else {
        monthGroupedTranaction[index].total += item.amount;
        total+=item.amount;
        monthGroupedTranaction[index].data.push(item);
      }
    }
    );
    console.log('check Point grouped expence', monthGroupedTranaction);
    console.log('Total :', total);
    let expenceTypeDataForPieChart: any = [];
    monthGroupedTranaction.forEach((item: any) => {
      expenceTypeDataForPieChart.push([item.type, item.total]);
      total+=item.total;
    }
    );
    this.expencetypePieChart=expenceTypeDataForPieChart;
  }


}
