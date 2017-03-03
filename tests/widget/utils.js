/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import ViewElement from '@ckeditor/ckeditor5-engine/src/view/element';
import { widgetize, isWidget, WIDGET_CLASS_NAME, setLabel, getLabel } from '../../src/widget/utils';

describe( 'widget utils', () => {
	let element;

	beforeEach( () => {
		element = new ViewElement( 'div' );
		widgetize( element );
	} );

	describe( 'widgetize()', () => {
		it( 'should set contenteditable to false', () => {
			expect( element.getAttribute( 'contenteditable' ) ).to.be.false;
		} );

		it( 'should define getFillerOffset method', () => {
			expect( element.getFillerOffset ).to.be.function;
			expect( element.getFillerOffset() ).to.be.null;
		} );

		it( 'should add proper CSS class', () => {
			expect( element.hasClass( WIDGET_CLASS_NAME ) ).to.be.true;
		} );

		it( 'should add element\'s label if one is provided', () => {
			element = new ViewElement( 'div' );
			widgetize( element, { label: 'foo bar baz label' } );

			expect( getLabel( element ) ).to.equal( 'foo bar baz label' );
		} );

		it( 'should add element\'s label if one is provided as function', () => {
			element = new ViewElement( 'div' );
			widgetize( element, { label: () => 'foo bar baz label' } );

			expect( getLabel( element ) ).to.equal( 'foo bar baz label' );
		} );
	} );

	describe( 'isWidget()', () => {
		it( 'should return true for widgetized elements', () => {
			expect( isWidget( element ) ).to.be.true;
		} );

		it( 'should return false for non-widgetized elements', () => {
			expect( isWidget( new ViewElement( 'p' ) ) ).to.be.false;
		} );
	} );

	describe( 'label utils', () => {
		it( 'should allow to set label for element', () => {
			const element = new ViewElement( 'p' );
			setLabel( element, 'foo bar baz' );

			expect( getLabel( element ) ).to.equal( 'foo bar baz' );
		} );

		it( 'should return empty string for elements without label', () => {
			const element = new ViewElement( 'div' );

			expect( getLabel( element ) ).to.equal( '' );
		} );

		it( 'should allow to use a function as label creator', () => {
			const element = new ViewElement( 'p' );
			let caption = 'foo';
			setLabel( element, () => caption );

			expect( getLabel( element ) ).to.equal( 'foo' );
			caption = 'bar';
			expect( getLabel( element ) ).to.equal( 'bar' );
		} );
	} );
} );
