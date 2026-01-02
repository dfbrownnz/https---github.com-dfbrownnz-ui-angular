import { Component } from '@angular/core';
import { Parser } from 'node-sql-parser';
import { JsonPipe } from '@angular/common'; // 1. Import the Pipe
import { Highlight } from 'ngx-highlightjs';

import { FormsModule } from '@angular/forms'; // 1. Import FormsModule

@Component({
  selector: 'app-my-sql-parser',
  imports: [
    FormsModule, // 2. Add to imports array
    Highlight , JsonPipe],
  templateUrl: './my-sql-parser.html',
  styleUrl: './my-sql-parser.css',
})
export class MySqlParser {
  parser = new Parser();

  newSql: string | null = null;
  oldSql: string   = "select id, name from students where age < 18";
  theAst : any   | null = null ;

  ngOnInit(): void {
    // Watch for changes in the URL (e.g., ?projectId=a)
    console.log('MySqlParser|loaded' )

     
        const ast = this.parser.astify( this.oldSql )
        console.log(ast)
        const sql = this.parser.sqlify(ast)
        console.log(sql)
        this.newSql=sql
        this.theAst = ast;


  }

  formatSql() {
    try {
      // 1. Parse the SQL into an AST
      // const ast = this.parser.astify(this.oldSql);
      const ast = this.parser.astify(this.oldSql);
      this.theAst = ast;

      // 2. Back-format the AST into prettified SQL
      this.newSql = this.parser.sqlify(ast);
    } catch (error) {
      console.error("Parsing failed", error);
      // You could trigger the Success/Error Toast we built earlier here!
    }
  }

}
