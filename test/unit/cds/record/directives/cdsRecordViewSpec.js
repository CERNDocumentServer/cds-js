/*
 * This file is part of CERN Document Server.
 * Copyright (C) 2016 CERN.
 *
 * CERN Document Server is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * CERN Document Server is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with CERN Document Server; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.
 *
 * In applying this license, CERN does not
 * waive the privileges and immunities granted to it by virtue of its status
 * as an Intergovernmental Organization or submit itself to any jurisdiction.
 */

'use strict';

describe('Unit: testing directive cds-record-view', function() {


  var $compile;
  var $rootScope;
  var scope;
  var template;

  // Inject the angular module
  beforeEach(angular.mock.module('cdsRecord'));

  // Load the templates
  beforeEach(angular.mock.module('templates'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    // Template compiler
    $compile = _$compile_;

    // The Scope
    $rootScope = _$rootScope_;

    // Attach it
    scope = $rootScope;


  }));

  it('should trigger init event', function() {
    // Spy the broadcast
    var spy = sinon.spy($rootScope, '$broadcast')

    // Complile&Digest here to catch the event
    // The directive's template
    template = '<cds-record-view ' +
      ' record=\'{"title_statement": {"title": "Jessica Jones Vol. 1"}}\' ' +
      ' template="src/cds/record/templates/record.html">' +
      ' </cds-record-view>';
    // Compile
    template = $compile(template)(scope);
    // Digest
    scope.$digest();

    // Check if the event has been triggered
    spy.should.have.been.calledOnce;
  });

  it('should trigger error', function() {
    // Spy the broadcast
    var spy = sinon.spy($rootScope, '$broadcast')

    // Complile&Digest here to catch the event
    // The directive's template
    template = '<cds-record-view ' +
      ' record=\'title": "Jessica Jones Vol. 1"}}\' ' +
      ' template="src/cds/record/templates/record.html">' +
      ' </cds-record-view>';
    // Compile
    template = $compile(template)(scope);
    // Digest
    scope.$digest();

    // Check if the event has been triggered
    spy.should.have.been.calledWith('cds.record.error');
  });

  it('should have the default parameters', function() {
    // Complile&Digest here to catch the event
    // The directive's template
    template = '<cds-record-view ' +
      ' record=\'{"title_statement": {"title": "Jessica Jones Vol. 1"}}\' ' +
      ' template="src/cds/record/templates/record.html">' +
      ' </cds-record-view>';
    // Compile
    template = $compile(template)(scope);
    // Digest
    scope.$digest();
    expect(template.scope().record.title_statement.title)
      .to.be.equal('Jessica Jones Vol. 1');
    // Digest
    scope.$digest();
  });
});
