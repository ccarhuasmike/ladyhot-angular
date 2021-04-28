import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  constructor(
  ) { }

  ngOnInit() {
    $(document).ready(() => {
      
      $('#cd-tab-filter li').click(function (event) {
        //mobile version - detect click event on filters tab
        var filter_tab_placeholder = $('.cd-tab-filter .placeholder a'),
          filter_tab_placeholder_default_value = 'Select',
          filter_tab_placeholder_text = filter_tab_placeholder.text();
        //detect which tab filter item was selected
        var selected_filter = $(event.target).data('type');
        //check if user has clicked the placeholder item
        if ($(event.target).is(filter_tab_placeholder)) {
          $('.cd-tab-filter').toggleClass('is-open');
        }
      });
    });
  }
  onCClick(event: any) {

  }
}

