import { TestBed, async } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordValidators } from './password-validators';
import { Component } from '@angular/core';

@Component({
    selector: 'test-component',
    template: `
        <form>
            <input />
        </form>
    `
})
class TestComponent {
    contol = new FormControl('')
}


describe('Password Validators', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [
                TestComponent
            ],
        }).compileComponents();
    }));

    it('minChar', () => {
        const fixture = TestBed.createComponent(TestComponent);
        const comp = fixture.componentInstance;
        comp.contol.setValidators(PasswordValidators.minChars);
        fixture.detectChanges();

        comp.contol.setValue("123");
        expect(comp.contol.valid).toBeFalse();

        comp.contol.setValue("12345678");
        expect(comp.contol.valid).toBeTrue();

        
        comp.contol.setValue("");
        expect(comp.contol.valid).toBeFalse();

        comp.contol.setValue("123123123123123123123123123123123123123123123");
        expect(comp.contol.valid).toBeTrue();

        comp.contol.setValue("#$^@#$*&^@#*&$^@#*$");
        expect(comp.contol.valid).toBeTrue();
    });

    it('minUppers', () => {
        const fixture = TestBed.createComponent(TestComponent);
        const comp = fixture.componentInstance;
        comp.contol.setValidators(PasswordValidators.minUppers);
        fixture.detectChanges();

        comp.contol.setValue("abcd");
        expect(comp.contol.valid).toBeFalse();

        comp.contol.setValue("aBcd");
        expect(comp.contol.valid).toBeTrue();
    });
});
