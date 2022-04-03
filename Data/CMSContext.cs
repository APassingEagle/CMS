using System;
using CMS.Features.Models.Stock;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CMS.Data
{
    public partial class CMSContext : DbContext
    {
        public CMSContext()
        {
        }

        public CMSContext(DbContextOptions<CMSContext> options)
            : base(options)
        {
        }

        public virtual DbSet<StockAccessory> StockAccessories { get; set; }
        public virtual DbSet<StockImage> StockImages { get; set; }
        public virtual DbSet<StockItem> StockItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<StockAccessory>(entity =>
            {
                entity.Property(e => e.AccessoryDescription).HasMaxLength(50);

                entity.Property(e => e.AccessoryName).HasMaxLength(50);

                entity.HasOne(d => d.StockItem)
                    .WithMany(p => p.StockAccessories)
                    .HasForeignKey(d => d.StockItemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StockAccessories_StockItems");
            });

            modelBuilder.Entity<StockImage>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.StockItem)
                    .WithMany(p => p.StockImages)
                    .HasForeignKey(d => d.StockItemId)
                    .HasConstraintName("FK_StockImages_StockItems");
            });

            modelBuilder.Entity<StockItem>(entity =>
            {
                entity.Property(e => e.Colour).HasMaxLength(50);

                entity.Property(e => e.DateCreated)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DateUpdated).HasColumnType("datetime");

                entity.Property(e => e.Make).HasMaxLength(50);

                entity.Property(e => e.Model).HasMaxLength(50);

                entity.Property(e => e.Vin)
                    .HasMaxLength(50)
                    .HasColumnName("VIN");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}