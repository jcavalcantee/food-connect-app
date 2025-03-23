export function phoneApplyMask(phone: string): string {
    const phoneWithoutMask = phone.replace(/\D/g, "");
    const phoneMask = phoneWithoutMask.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    return phoneMask;
}