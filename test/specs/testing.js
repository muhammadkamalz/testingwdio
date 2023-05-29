const data = require('../pageobjects/datalogin')
const datakeranjang = require('../pageobjects/halamankeranjang')
const cek = require('../pageobjects/prosescek')
const cekkeranjang = require('../pageobjects/cekkeranjang.js')
const out = require('../pageobjects/checkout')


describe ('Proses Login', () => {
    describe('Login tanpa menggunakan username & password', () => {
        it.skip('Login gagal', async() => {
            await data.open()
            await data.login('','')
            await browser.pause(1000)
            await expect(cek.ceknotifikasi1).toBeExisting()
            await browser.pause(1000)
            await expect(cek.ceknotifikasi1).toHaveTextContaining('Username is required')
        }
        )
    })

    describe('Login tanpa menggunakan password', () => {
        it.skip('Login gagal & menampilkan error "Password is required"', async() => {
            await data.open()
            await data.login('standard_user','')
            await browser.pause(1500)
            await expect(cek.ceknotifikasi1).toBeExisting()

            await browser.pause(1000)
            await expect(cek.ceknotifikasi1).toHaveTextContaining('Password is required');
        })
    })

    describe ('Login tanpa menggunakan username', () => {
        it.skip('Login gagal & menampilkan error "Username is required', async () => {
            await data.open()
            await data.login('','secret_sauce')

            await browser.pause(1500)
            await expect(cek.ceknotifikasi1).toBeExisting()

            await browser.pause(1000)
            await expect(cek.ceknotifikasi1).toHaveTextContaining('Username is required')
        })
    })

    describe ('Login dengan memasukkan username & password', () => {
        it('Halaman Utama ditampilkan', async() => {
            await data.open()
            await data.login('standard_user', 'secret_sauce')

            await browser.pause(1500)
            await expect(cek.inventory).toBeExisting()
        })
    })

    describe ('Logout', () => {
        it.skip('Logout berhasil & Halaman login ditampilkan', async() => {
            await cek.klik()
            await browser.pause(1000)
            
            await cek.logout()
            await browser.pause(1000)

            await expect(cek.halamanlogin).toBeExisting()
        })
    })
})

// batas 1-------------------------------------------------------------------------------------------------
describe('Mengurutkan Halaman Utama', () => {
    describe('Mengurutkan dari z - a', () => {
        it.skip('Berhasil terurut dari z - a', async() => {
            await data.pilihza()
            await browser.pause(1000)

            await expect(cek.urutan).toHaveTextContaining('Z to A')
        })
    })

    describe('Mengurutkan barang berdasarkan harga dari terendah ke tertinggi', () => {
        it.skip('Berhasil mengurutkan barang dari harga terendah', async() => {
            await data.pilihrendah()
            await browser.pause(1000)

            await expect(cek.urutan).toHaveTextContaining('low to high')
        })
    })

    describe ('Mengurutkan barang berdaskan harga dari tertinggi ke terendah', () => {
        it.skip('Berhasil mengurutkan barang dari harga tertinggi', async() => {
            await data.pilihtinggi()
            await browser.pause(1000)

            await expect(cek.urutan).toHaveTextContaining('high to low')
        })
    })
})

describe('Membuka halaman keranjang', () => {
    it('Halaman keranjang ditampilkan', async() => {
        await datakeranjang.bukakeranjang()
        await browser.pause(1000)

        await expect(cekkeranjang.cart).toBeExisting()
    })
})

// batas 2 ---------------------------------------------------------------------------------------------------

describe ('Memasukkan & Menghapus barang', () => {
    describe('Memasukkan Barang kedalam Keranjang', async() => {
        it('Barang berhasil dimasukkan & Barang ada didalam keranjang', async() => {
            await datakeranjang.kembali()
            await browser.pause(1000)

            await cekkeranjang.tambahbarang()
            await browser.pause(1000)
            await expect (cekkeranjang.barharga).toHaveTextContaining('Remove')
            await browser.pause(1000)

            await datakeranjang.bukakeranjang()
            await browser.pause(1000)

            await expect(cekkeranjang.isicart).toBeExisting()
        })
    })

    describe ('Menghapus barang didalam keranjang', () => {
        it.skip('Barang berhasil dihapus', async() => {
            await cekkeranjang.hapusbarang1()
            await browser.pause(1000)

            await cekkeranjang.hapusbarang2()
            await browser.pause(1000)

            await expect(cekkeranjang.cartterhapus).toBeExisting()
        })
    })

    describe ('Menghapus barang di keranjang melalui halaman utama', ()=> {
        it.skip('Barang berhasil dihapus', async() => {
            await datakeranjang.kembali()
            await browser.pause(1000)

            await cekkeranjang.hapusbaranglangsung()
            await browser.pause(1000)

            await expect(cekkeranjang.barharga).toHaveTextContaining('Add to cart')
        })
    })
})

// batas 3 ------------------------------------------------------------------------------------------------------

describe('Checkout barang', () => {
    describe('Checkout barang tanpa ada barang didalam keranjang', () => {
// skip tes memasukkan barang terlebih dahulu untuk melakukan pengetesan ini
        it.skip('Halaman checkout tidak terbuka', async() => {
            await datakeranjang.checkout()
            await browser.pause(1000)
            await expect(out.formcheckout).not.toBeExisting()
        })      
    })

    describe('Checkout barang Sampai selesai', () => {
    // jangan skip tes memasukkan barang untuk tes ini
        it('Berhasil CHeckout', async () => {
            await datakeranjang.checkout()
            await browser.pause(1000)

            await out.lanjutcheckout ('Budi','Wijaya','14045')
            await browser.pause(1000)


            await expect (out.ringkasancheckout).toBeExisting()
            await browser.pause(1000)

            await out.tamatcheckout()
            await browser.pause(1000)


            //mengecek apakah chekout berhasil dengan mengecek tampilan halaman selesai checkout
            await expect(out.cekselesaicheckout).toBeExisting()
            await browser.pause(1000)

            //kembali ke halaman awal
            await out.selesaicheckout()
            await browser.pause(1000)
            await expect(cek.inventory).toBeExisting()
        })
    })

    describe('Batal Checkout', async() => {
        it.skip('Checkout dibatalkan dan kembali ke halaman utama', async () => {
            await datakeranjang.checkout()
            await browser.pause(1000)

            await out.lanjutcheckout ('Budi','Wijaya','14045')
            await browser.pause(1000)

            await expect (out.ringkasancheckout).toBeExisting()
            await browser.pause(1000)

            await out.tidakcheckout()
            await browser.pause(1000)
            await expect(cek.inventory).toBeExisting()
        })
    })

    describe('Checkout barang tanpa nama depan', () => {
        it.skip('Checkout gagal & muncul notifikasi "First Name is Required"', async () => {
            await datakeranjang.checkout()
            await browser.pause(1000)

            await out.lanjutcheckout ('','Wijaya','14045')
            await browser.pause(1000)

            await expect (cek.ceknotifikasi1).toHaveTextContaining('First Name is required')
            await browser.pause(1000)
        })
    })

    describe('Checkout barang tanpa nama belakang', () => {
        it.skip('Checkout gagal & muncul notifikasi "Last Name is required"', async() => {
            await datakeranjang.checkout()
            await browser.pause(1000)

            await out.lanjutcheckout ('Budi','','14045')
            await browser.pause(1000)

            await expect (cek.ceknotifikasi1).toHaveTextContaining('Last Name is required')
            await browser.pause(1000)
        })
    })

    describe('Checkout barang tanpa kode pos', () => {
        it.skip('Checkout gagal & muncul notifikasi "Postal Code is required', async() => {
            await datakeranjang.checkout()
            await browser.pause(1000)

            await out.lanjutcheckout ('Budi','Wijaya','')
            await browser.pause(1000)

            await expect (cek.ceknotifikasi1).toHaveTextContaining('Postal Code is required')
            await browser.pause(1000)
        })
    })
})

// batas 4 ------------------------------------------------------------------------------------------------------
