//  Ticket.swift
//  MovieNest
//
//  Created by Samanyu on 26/02/25.
//

import SwiftUI

struct Ticket: View {
    @State var title = "Thor"
    @State var subtitle = "Love and Thunder"
    @State var top = "thor-top"
    @State var bottom = "thor-bottom"

    var gradient = [Color("cyan"), Color("cyan").opacity(0), Color("cyan").opacity(0)]

    var body: some View {
        VStack(spacing: 0.0) {
            VStack(spacing: 2.0) {
                Text(title)
                    .fontWeight(.bold)
                    .foregroundColor(.black)
                
                Text(subtitle)
                    .foregroundColor(.black)
            }
            .padding(EdgeInsets(top: 20, leading: 30, bottom: 0, trailing: 30))
            .frame(width: 300, height: 420, alignment: .top)
            .foregroundColor(.white)
            .background(
                Image(top)
                    .resizable()
                    .scaledToFill()
                    .clipped()
            )
            .clipShape(RoundedRectangle(cornerRadius: 40))
            .overlay {
                RoundedRectangle(cornerRadius: 40)
                    .stroke(LinearGradient(colors: gradient, startPoint: .topLeading, endPoint: .bottomTrailing), style: StrokeStyle(lineWidth: 2))
                }
            .cornerRadius(40, corners: [.topLeft, .topRight])
            
            VStack(spacing: 10.0) {
                Line()
                    .stroke(style: StrokeStyle(lineWidth: 2, dash: [7]))
                    .frame(width: 200, height: 1)
                    .opacity(0.6)
                
            }
        }
        .frame(height: 460)
        .font(.footnote)
        .shadow(radius: 10)
    }
}

struct Ticket_Previews: PreviewProvider {
    static var previews: some View {
        Ticket()
    }
}
